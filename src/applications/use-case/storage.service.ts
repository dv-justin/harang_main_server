import { HttpException, Injectable } from '@nestjs/common';
import { StorageServicePort } from '../port/in-bound/storage.service.port';
import { StorageAdapterPort } from '../port/out-bound/storage.adapter.port';

@Injectable()
export class StorageService implements StorageServicePort {
  private readonly allowedExtensions: string[];

  constructor(private readonly StorageAdapterPort: StorageAdapterPort) {
    this.allowedExtensions = [
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
  }

  async uploadFile(
    files: Express.Multer.File[],
  ): Promise<{ fileUrl: string[] }> {
    if (!files || files.length === 0) {
      throw new HttpException('파일이 제공되지 않았습니다.', 404);
    }

    files.map((file) => {
      const fileName = file.originalname;
      const extension = fileName.split('.').pop();
      if (!this.allowedExtensions.includes(extension)) {
        throw new HttpException('지원하지 않는 파일 형식입니다.', 400);
      }
    });

    const fileUrl = await Promise.all(
      files.map((file) => this.StorageAdapterPort.uploadFile(file)),
    );

    return { fileUrl };
  }
}
