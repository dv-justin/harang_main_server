import { Expose, Type } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
}

export class ResponseFindByTieDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserDto)
  man_user: UserDto;

  @Expose()
  @Type(() => UserDto)
  female_user: UserDto;

  @Expose()
  meeting_date: string | null;

  @Expose()
  meeting_status: number;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;

  @Expose()
  deleted_at: string | null;

  @Expose()
  man_user_ticket_used: boolean;

  @Expose()
  female_user_ticket_used: boolean;

  @Expose()
  is_failed: boolean;
}
