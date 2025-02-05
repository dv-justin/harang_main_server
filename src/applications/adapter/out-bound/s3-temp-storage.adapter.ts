import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3TempStorageAdapterPort } from 'src/applications/port/out-bound/s3-temp-storage.adapter.port';
import { TempS3StorageUrlDto } from './dtos/response/response-upload-file-url.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class S3TempStorageAdapter implements S3TempStorageAdapterPort {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('TEMP_AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'TEMP_AWS_SECRET_ACCESS_KEY',
        ),
      },
      maxAttempts: 5,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucketName = this.configService.get<string>('TEMP_AWS_S3_BUCKET');
    const key = `uploads/${Date.now()}-${file.originalname}`;

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
      partSize: 10 * 1024 * 1024,
      leavePartsOnError: true,
    });

    const result = await upload.done();
    const upload_file_dto = plainToInstance(TempS3StorageUrlDto, result, {
      excludeExtraneousValues: true,
    });

    return upload_file_dto.Location;
  }
}
