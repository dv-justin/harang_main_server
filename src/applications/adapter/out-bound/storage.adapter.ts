import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageAdapterPort } from 'src/applications/port/out-bound/storage.adapter.port';
import { StorageUrlDto } from './dtos/responses/response-upload-file-url.dto';
import { plainToInstance } from 'class-transformer';
import { PassThrough } from 'stream';

@Injectable()
export class StorageAdapter implements StorageAdapterPort {
  private s3: S3Client;
  private temp_bucket_name: string;
  private final_bucket_name: string;

  constructor(private readonly configService: ConfigService) {
    this.temp_bucket_name =
      this.configService.get<string>('TEMP_AWS_S3_BUCKET');
    this.final_bucket_name = this.configService.get<string>(
      'FINAL_AWS_S3_BUCKET',
    );
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
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `uploads/${Date.now()}-${file.originalname}`;

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.temp_bucket_name,
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
      Bucket: this.temp_bucket_name,
      Key: key,
    });
    const response = await this.s3.send(command);
    const body = response.Body as unknown as PassThrough;

    const pass_through_stream = new PassThrough();
    body.pipe(pass_through_stream);

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.final_bucket_name,
        Key: key,
        Body: pass_through_stream,
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
