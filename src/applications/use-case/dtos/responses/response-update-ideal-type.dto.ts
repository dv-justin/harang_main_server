import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseUpdateIdealTypeDto {
  @IsNotEmpty()
  @IsString()
  idealTypeAge: string;

  @IsNotEmpty()
  @IsNumber()
  idealTypeDistance: number;
}
