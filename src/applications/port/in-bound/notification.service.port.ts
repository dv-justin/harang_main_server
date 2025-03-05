import { ResponseGetNotificationDto } from 'src/applications/use-case/dtos/responses/response-get-notification.dto';

export abstract class NotificationServicePort {
  saveNotification: () => Promise<void>;
  getNotifications: (user_id: number) => Promise<ResponseGetNotificationDto[]>;
}
