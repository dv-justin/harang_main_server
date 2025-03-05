import { Expose } from 'class-transformer';

export class ResponseNotificationFindDto {
  @Expose()
  id: number;

  @Expose()
  category: string;

  @Expose()
  contents: string;
}
