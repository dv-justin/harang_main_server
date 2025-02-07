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
        const tempBucketName = configService.get<string>('TEMP_AWS_S3_BUCKET');
        const finalBucketName = configService.get<string>(
          'FINAL_AWS_S3_BUCKET',
        );
        return new StorageAdapter(
          configService,
          tempBucketName,
          finalBucketName,
        );
      },
      inject: [ConfigService],
    },
    {
      provide: StorageServicePort,
      useClass: StorageService,
    },
  ],
  exports: [
    {
      provide: StorageServicePort,
      useClass: StorageService,
    },
  ],
})
export class StorageModule {}
