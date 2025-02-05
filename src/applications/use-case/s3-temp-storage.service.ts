import { HttpException, Injectable } from '@nestjs/common';
import { S3TempStorageServicePort } from '../port/in-bound/s3-temp-storage.service.port';
import { S3TempStorageAdapterPort } from '../port/out-bound/s3-temp-storage.adapter.port';

@Injectable()
export class S3TempStorageService implements S3TempStorageServicePort {
  constructor(
    private readonly s3TempStorageAdapterPort: S3TempStorageAdapterPort,
  ) {}

  async uploadFile(
    files: Express.Multer.File[],
  ): Promise<{ fileUrl: string[] }> {
    if (!files) {
      throw new HttpException('파일이 제공되지 않았습니다.', 404);
    }

    const allowedExtensions = [
      'png',
      'jpg',
      'jpeg',
      'bmp',
      'svg',
      'gif',
      'tiff',
      'webp',
      'heif',
      'ico',
      'raw',
      'cr2',
      'nef',
      'arw',
    ];

    files.map((file) => {
      const fileName = file.originalname;
      const extension = fileName.split('.').pop();
      if (!allowedExtensions.includes(extension)) {
        throw new HttpException('지원하지 않는 파일 형식입니다.', 400);
      }
    });

    const fileUrl = await Promise.all(
      files.map((file) => this.s3TempStorageAdapterPort.uploadFile(file)),
    );

    return { fileUrl };
  }
}
