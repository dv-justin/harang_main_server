import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageAdapterPort } from 'src/applications/port/out-bound/storage.adapter.port';
import { StorageUrlDto } from './dtos/response/response-upload-file-url.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StorageAdapter implements StorageAdapterPort {
  private s3: S3Client;
  private bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    bucketName: string,
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

    this.bucketName = bucketName;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `uploads/${Date.now()}-${file.originalname}`;

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucketName,
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
}
