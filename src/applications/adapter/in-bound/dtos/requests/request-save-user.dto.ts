import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class RequestSaveUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  birthdate: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  region_level1: string;

  @IsNotEmpty()
  @IsString()
  region_level2: string;

  @IsNotEmpty()
  @IsString()
  church_name: string;

  @IsNotEmpty()
  @IsString()
  pastor_name: string;

  @IsNotEmpty()
  @IsString()
  school_and_major: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsNotEmpty()
  @IsString()
  your_faith: string;

  @IsNotEmpty()
  @IsString()
  influential_verse: string;

  @IsNotEmpty()
  @IsString()
  prayer_topic: string;

  @IsNotEmpty()
  @IsString()
  vision: string;

  @IsNotEmpty()
  @IsString()
  couple_activity: string;

  @IsNotEmpty()
  @IsString()
  expected_meeting: string;

  @IsNotEmpty()
  @IsString()
  merit: string;

  @IsNotEmpty()
  @IsString()
  ideal_type_age: string;

  @IsNotEmpty()
  @IsNumber()
  ideal_type_distance: number;
}
