import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3StorageController } from 'src/applications/adapter/in-bound/s3-storage.controller';
import { S3TempStorageAdapterPort } from 'src/applications/port/out-bound/s3-temp-storage.adapter.port';
import { S3TempStorageAdapter } from 'src/applications/adapter/out-bound/s3-temp-storage.adapter';
import { S3TempStorageServicePort } from 'src/applications/port/in-bound/s3-temp-storage.service.port';
import { S3TempStorageService } from 'src/applications/use-case/s3-temp-storage.service';

@Module({
  imports: [ConfigModule],
  controllers: [S3StorageController],
  providers: [
    {
      provide: S3TempStorageAdapterPort,
      useClass: S3TempStorageAdapter,
    },
    {
      provide: S3TempStorageServicePort,
      useClass: S3TempStorageService,
    },
  ],
  exports: [],
})
export class S3TempStorageModule {}
