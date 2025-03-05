import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotificationServicePort } from '../port/in-bound/notification.service.port';
import { NotificationGatewayPort } from '../port/out-bound/notification.gateway.port';
import { NotificationRepositoryPort } from '../port/out-bound/repositories/notification.repository.port';
import { ResponseGetNotificationDto } from './dtos/responses/response-get-notification.dto';
import { NotificationGateway } from '../adapter/out-bound/notification.gateway';

@Injectable()
export class NotificationService implements NotificationServicePort {
  constructor(
    private readonly notificationRepositoryPort: NotificationRepositoryPort,

    @Inject(forwardRef(() => NotificationGateway))
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async saveNotification(): Promise<void> {
    await this.notificationRepositoryPort.save({
      user_id: 1,
      category: '만남',
      contents: '상대방이 애프터 신청을 거절하셨습니다. ㅠㅠ',
    });

    const notifications = await this.getNotifications(1);
    this.notificationGateway.sendNotificationToClients(notifications);
  }

  async getNotifications(
    user_id: number,
  ): Promise<ResponseGetNotificationDto[]> {
    const notifications = await this.notificationRepositoryPort.find({
      where: {
        user_id: user_id,
      },
      select: ['id', 'category', 'contents'],
      order: {
        created_at: 'DESC',
      },
    });

    return notifications;
  }
}
