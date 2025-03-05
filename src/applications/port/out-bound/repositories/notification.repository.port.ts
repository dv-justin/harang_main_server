import { ResponseNotificationFindDto } from 'src/applications/adapter/out-bound/dtos/response-notification-find.dto';
import { FindNotificationInterface } from 'src/applications/adapter/out-bound/interfaces/notification-find.interface';
import { NotificationSaveInterface } from 'src/applications/adapter/out-bound/interfaces/notification-save.interface';
import { NotificationEntity } from 'src/applications/domain/entities/notification.entity';

export abstract class NotificationRepositoryPort {
  save: (data: NotificationSaveInterface) => Promise<void>;
  find: (
    options: FindNotificationInterface<NotificationEntity>,
  ) => Promise<ResponseNotificationFindDto[]>;
}
