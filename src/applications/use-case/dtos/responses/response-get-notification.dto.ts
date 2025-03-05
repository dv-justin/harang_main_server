import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseGetNotificationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  contents: string;
}
