import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ResponseGetUserIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  gender: string;
}
