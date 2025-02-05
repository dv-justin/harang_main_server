import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StorageController } from 'src/applications/adapter/in-bound/storage.controller';
import { StorageAdapterPort } from 'src/applications/port/out-bound/storage.adapter.port';
import { StorageAdapter } from 'src/applications/adapter/out-bound/storage.adapter';
import { StorageServicePort } from 'src/applications/port/in-bound/storage.service.port';
import { StorageService } from 'src/applications/use-case/storage.service';

@Module({
  imports: [ConfigModule],
  controllers: [StorageController],
  providers: [
    {
      provide: StorageAdapterPort,
      useFactory: (configService: ConfigService) => {
        const bucketName = configService.get<string>('TEMP_AWS_S3_BUCKET');
        return new StorageAdapter(configService, bucketName);
      },
      inject: [ConfigService],
    },
    {
      provide: StorageServicePort,
      useClass: StorageService,
    },
  ],
  exports: [],
})
export class StorageModule {}
