import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseUpdateIdealTypeDto {
  @IsNotEmpty()
  @IsString()
  ideal_type_age: string;

  @IsNotEmpty()
  @IsNumber()
  ideal_type_distance: number;
}