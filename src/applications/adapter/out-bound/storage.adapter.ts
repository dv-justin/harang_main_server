import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageAdapterPort } from 'src/applications/port/out-bound/storage.adapter.port';
import { StorageUrlDto } from './dtos/responses/response-upload-file-url.dto';
import { plainToInstance } from 'class-transformer';
import { PassThrough, Readable } from 'stream';

@Injectable()
export class StorageAdapter implements StorageAdapterPort {
  private s3: S3Client;
  private tempBucketName: string;
  private finalBucketName: string;

  constructor(
    private readonly configService: ConfigService,
    tempBucketName: string,
    finalBucketName: string,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
      maxAttempts: 5,
    });

    this.tempBucketName = tempBucketName;
    this.finalBucketName = finalBucketName;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `uploads/${Date.now()}-${file.originalname}`;

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.tempBucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
      partSize: 10 * 1024 * 1024,
      leavePartsOnError: true,
    });

    const result = await upload.done();
    const upload_file_dto = plainToInstance(StorageUrlDto, result, {
      excludeExtraneousValues: true,
    });

    return upload_file_dto.Location;
  }

  async moveFile(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.tempBucketName,
      Key: key,
    });
    const response = await this.s3.send(command);
    const body = response.Body as unknown as PassThrough;

    const passThroughStream = new PassThrough();
    body.pipe(passThroughStream);

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.finalBucketName,
        Key: key,
        Body: passThroughStream,
        ContentType: response.ContentType,
      },
      partSize: 10 * 1024 * 1024,
      leavePartsOnError: true,
    });

    const result = await upload.done();
    const upload_file_dto = plainToInstance(StorageUrlDto, result, {
      excludeExtraneousValues: true,
    });

    return upload_file_dto.Location;
  }
}
