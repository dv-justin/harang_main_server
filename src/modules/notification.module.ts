import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationGateway } from 'src/applications/adapter/out-bound/notification.gateway';
import { NotificationRepository } from 'src/applications/adapter/out-bound/repositories/notification.repository';
import { NotificationEntity } from 'src/applications/domain/entities/notification.entity';
import { NotificationServicePort } from 'src/applications/port/in-bound/notification.service.port';
import { NotificationGatewayPort } from 'src/applications/port/out-bound/notification.gateway.port';
import { NotificationRepositoryPort } from 'src/applications/port/out-bound/repositories/notification.repository.port';
import { NotificationService } from 'src/applications/use-case/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  providers: [
    {
      provide: NotificationServicePort,
      useClass: NotificationService,
    },
    {
      provide: NotificationRepositoryPort,
      useClass: NotificationRepository,
    },
    NotificationGateway,
  ],
  exports: [
    {
      provide: NotificationServicePort,
      useClass: NotificationService,
    },
  ],
})
export class NotificationModule {}
