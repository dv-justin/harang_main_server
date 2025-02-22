import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestUpdateIdealTypeDto {
  @IsOptional()
  @IsString()
  ideal_type_age?: string;

  @IsOptional()
  @IsNumber()
  ideal_type_distance?: number;
}
