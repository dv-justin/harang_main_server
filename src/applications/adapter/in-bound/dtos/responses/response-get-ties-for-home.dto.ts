import { IsArray, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MeetingInfo {
  @IsNotEmpty()
  @IsString()
  meetingLocation: string;

  @IsNotEmpty()
  @IsString()
  meetingAddress: string;

  @IsNotEmpty()
  @IsString()
  meetingSchedule: string;
}

export class ResponseGetTiesForHomeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MeetingInfo)
  meetingInfoList: MeetingInfo[];

  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
