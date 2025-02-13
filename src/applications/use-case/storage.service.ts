import { HttpException, Injectable } from '@nestjs/common';
import { StorageServicePort } from '../port/in-bound/storage.service.port';
import { StorageAdapterPort } from '../port/out-bound/storage.adapter.port';

@Injectable()
export class StorageService implements StorageServicePort {
  private readonly allowed_extensions: string[];
  private readonly regex: RegExp;

  constructor(private readonly StorageAdapterPort: StorageAdapterPort) {
    this.allowed_extensions = [
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
  ): Promise<{ file_urls: string[] }> {
    if (!files || files.length === 0) {
      throw new HttpException('파일이 제공되지 않았습니다.', 404);
    }

    files.map((file) => {
      const file_name = file.originalname;
      const extension = file_name.split('.').pop();
      if (!this.allowed_extensions.includes(extension)) {
        throw new HttpException('지원하지 않는 파일 형식입니다.', 400);
      }
    });

    const file_urls = await Promise.all(
      files.map((file) => this.StorageAdapterPort.uploadFile(file)),
    );

    return { file_urls };
  }

  async moveFile(urls: string[]): Promise<{ file_urls: string[] }> {
    if (!urls || urls.length === 0) {
      throw new HttpException('파일이 제공되지 않았습니다.', 404);
    }

    const keys = urls.map((url) => {
      const match = url.match(this.regex);
      if (!match || !match[1]) {
        throw new HttpException('URL 형식을 확인해주세요.', 400);
      }

      return match[1];
    });

    const file_urls = await Promise.all(
      keys.map((key) => {
        const decoded_key = decodeURIComponent(key);
        return this.StorageAdapterPort.moveFile(decoded_key);
      }),
    );

    return { file_urls };
  }
}
