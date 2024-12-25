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

  @IsBoolean()
  @IsNotEmpty()
  isMyTicket: boolean;
}
