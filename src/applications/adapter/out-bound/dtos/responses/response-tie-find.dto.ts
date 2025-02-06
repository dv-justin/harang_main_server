import { Expose, Type } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  gender: string;

  @Expose()
  region_level1: string;

  @Expose()
  region_level2: string;

  @Expose()
  birthdate: string;
}

export class ResponseTieFindDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserDto)
  man_user: UserDto;

  @Expose()
  @Type(() => UserDto)
  female_user: UserDto;

  @Expose()
  meeting_status: number;

  @Expose()
  meeting_location: string;

  @Expose()
  meeting_address: string;

  @Expose()
  meeting_schedule: string;

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
