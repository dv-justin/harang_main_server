import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ResponseGetIdealTypeDto {
  @IsNotEmpty()
  @IsString()
  ideal_type_age: string;

  @IsNotEmpty()
  @IsNumber()
  ideal_type_distance: number;
}