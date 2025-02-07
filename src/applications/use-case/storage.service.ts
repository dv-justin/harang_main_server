import { HttpException, Injectable } from '@nestjs/common';
import { StorageServicePort } from '../port/in-bound/storage.service.port';
import { StorageAdapterPort } from '../port/out-bound/storage.adapter.port';

@Injectable()
export class StorageService implements StorageServicePort {
  private readonly allowedExtensions: string[];
  private readonly regex: RegExp;

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

    this.regex = /https:\/\/[^/]+\/(.*)/;
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

  async moveFile(tempUrls: string[]): Promise<{ finalUrls: string[] }> {
    if (!tempUrls || tempUrls.length === 0) {
      throw new HttpException('파일이 제공되지 않았습니다.', 404);
    }

    const keys = tempUrls.map((url) => {
      const match = url.match(this.regex);
      if (!match || !match[1]) {
        throw new HttpException('URL 형식을 확인해주세요.', 400);
      }

      return match[1];
    });

    const finalUrls = await Promise.all(
      keys.map((key) => {
        const decodedKey = decodeURIComponent(key);
        return this.StorageAdapterPort.moveFile(decodedKey);
      }),
    );

    return { finalUrls };
  }
}
