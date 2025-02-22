import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

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
  @IsOptional()
  id: number;

  @Expose()
  @IsOptional()
  @Type(() => UserDto)
  man_user?: UserDto;

  @Expose()
  @IsOptional()
  @Type(() => UserDto)
  female_user?: UserDto;

  @Expose()
  @IsOptional()
  meeting_status?: number;

  @Expose()
  @IsOptional()
  meeting_location?: string;

  @Expose()
  @IsOptional()
  meeting_address?: string;

  @Expose()
  @IsOptional()
  meeting_schedule?: string;

  @Expose()
  @IsOptional()
  created_at?: string;

  @Expose()
  @IsOptional()
  updated_at?: string;

  @Expose()
  @IsOptional()
  deleted_at?: string | null;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => !!value)
  man_user_ticket_used?: boolean;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => !!value)
  female_user_ticket_used?: boolean;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => !!value)
  man_user_after?: boolean;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => !!value)
  female_user_after?: boolean;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => !!value)
  is_failed?: boolean;
}
