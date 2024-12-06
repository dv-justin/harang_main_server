import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UserDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class ResponseGetTieDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsDateString()
  @IsNotEmpty()
  created_at: string;

  @IsDateString()
  @IsNotEmpty()
  updated_at: string;

  @IsDateString()
  @IsOptional()
  deleted_at: string | null;

  @IsOptional()
  @IsDateString()
  meeting_date: string | null;

  @IsInt()
  @IsNotEmpty()
  meeting_status: number;

  @ValidateNested()
  @Type(() => UserDto)
  man_user: UserDto;

  @ValidateNested()
  @Type(() => UserDto)
  female_user: UserDto;

  @IsBoolean()
  @IsNotEmpty()
  man_user_ticket_used: boolean;

  @IsBoolean()
  @IsNotEmpty()
  female_user_ticket_used: boolean;

  @IsBoolean()
  @IsNotEmpty()
  is_failed: boolean;
}
