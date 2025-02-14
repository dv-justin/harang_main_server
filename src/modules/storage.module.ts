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
      useClass: StorageAdapter,
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
