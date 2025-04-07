import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ResponseGetTiesForDirectDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  meetingStatus: number;

  @IsInt()
  @IsNotEmpty()
  yourUserId: number;

  @IsBoolean()
  @IsNotEmpty()
  isMyTicket: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isYourTicket: boolean;

  @IsString()
  @IsNotEmpty()
  allTicketsUsedBy: boolean;
}
