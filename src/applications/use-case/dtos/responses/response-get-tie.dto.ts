import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseGetTieDto {
  @IsString()
  @IsNotEmpty()
  meeting_address: string;

  @IsString()
  @IsNotEmpty()
  meeting_location: string;

  @IsString()
  @IsNotEmpty()
  meeting_schedule: string;
}
