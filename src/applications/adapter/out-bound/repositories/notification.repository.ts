import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/applications/domain/entities/notification.entity';
import { Repository } from 'typeorm';
import { NotificationSaveInterface } from '../interfaces/notification-save.interface';
import { NotificationRepositoryPort } from 'src/applications/port/out-bound/repositories/notification.repository.port';
import { FindNotificationInterface } from '../interfaces/notification-find.interface';
import { plainToInstance } from 'class-transformer';
import { ResponseNotificationFindDto } from '../dtos/response-notification-find.dto';

@Injectable()
export class NotificationRepository implements NotificationRepositoryPort {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async save(data: NotificationSaveInterface): Promise<void> {
    const notification = this.notificationRepository.create(data);
    await this.notificationRepository.save(notification);
  }

  async find(
    options: FindNotificationInterface<NotificationEntity>,
  ): Promise<ResponseNotificationFindDto[]> {
    const notifications_entity = await this.notificationRepository.find({
      ...options,
    });

    const notifications_dto = plainToInstance(
      ResponseNotificationFindDto,
      notifications_entity,
      {
        excludeExtraneousValues: true,
      },
    );

    return notifications_dto;
  }
}
