import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ResponseGetIdealTypeDto {
  @IsNotEmpty()
  @IsString()
  idealTypeAge: string;

  @IsNotEmpty()
  @IsNumber()
  idealTypeDistance: number;
}