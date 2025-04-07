import { Expose, Transform } from 'class-transformer';

export class ResponseTieFindOneDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ value }) => !!value)
  man_user_ticket_used: boolean;

  @Expose()
  @Transform(({ value }) => !!value)
  female_user_ticket_used: boolean;

  @Expose()
  all_tickets_used_by: boolean;
}
