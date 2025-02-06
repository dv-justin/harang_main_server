import { Expose } from 'class-transformer';

export class ResponseTieFindOneDto {
  @Expose()
  id: number;

  @Expose()
  meeting_location: string;

  @Expose()
  meeting_address: string;

  @Expose()
  meeting_schedule: string;

  @Expose()
  man_user_ticket_used: number;

  @Expose()
  female_user_ticket_used: number;

  @Expose()
  all_tickets_used_by: string;
}
