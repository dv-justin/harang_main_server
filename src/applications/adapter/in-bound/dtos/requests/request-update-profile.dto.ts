import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

class ProfileImage {
  @IsArray()
  @IsString({ each: true })
  urls: string[];

  @IsArray()
  @IsString({ each: true })
  temp_urls: string[];
}

export class RequestUpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  birthdate?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  region_level1?: string;

  @IsOptional()
  @IsString()
  region_level2?: string;

  @IsOptional()
  @IsString()
  church_name?: string;

  @IsOptional()
  @IsString()
  pastor_name?: string;

  @IsOptional()
  @IsString()
  school_and_major?: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsString()
  your_faith?: string;

  @IsOptional()
  @IsString()
  influential_verse?: string;

  @IsOptional()
  @IsString()
  prayer_topic?: string;

  @IsOptional()
  @IsString()
  vision?: string;

  @IsOptional()
  @IsString()
  couple_activity?: string;

  @IsOptional()
  @IsString()
  expected_meeting?: string;

  @IsOptional()
  @IsString()
  merit?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileImage)
  profile_image?: ProfileImage;
}
