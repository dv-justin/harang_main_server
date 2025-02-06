import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseGetTieDto {
  @IsString()
  @IsNotEmpty()
  meetingAddress: string;

  @IsString()
  @IsNotEmpty()
  meetingLocation: string;

  @IsString()
  @IsNotEmpty()
  meetingSchedule: string;
}
