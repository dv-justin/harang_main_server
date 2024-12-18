import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ResponseGetUserIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  regionLevel1: string;

  @IsNotEmpty()
  @IsString()
  regionLevel2: string;

  @IsOptional()
  @IsString()
  churchName?: string;

  @IsOptional()
  @IsString()
  pastorName?: string;

  @IsOptional()
  @IsString()
  schoolAndMajor?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  yourFaith?: string;

  @IsOptional()
  @IsString()
  influentialVerse?: string;

  @IsOptional()
  @IsString()
  prayerTopic?: string;

  @IsOptional()
  @IsString()
  vision?: string;

  @IsOptional()
  @IsString()
  coupleActivity?: string;

  @IsOptional()
  @IsString()
  expectedMeeting?: string;

  @IsOptional()
  @IsString()
  merit?: string;
}
