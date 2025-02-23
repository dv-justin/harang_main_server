import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class ResponseUpdateProfileDto {
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

  @IsNotEmpty()
  @IsString()
  churchName: string;

  @IsNotEmpty()
  @IsString()
  pastorName: string;

  @IsNotEmpty()
  @IsString()
  schoolAndMajor: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  yourFaith: string;

  @IsNotEmpty()
  @IsString()
  influentialVerse: string;

  @IsNotEmpty()
  @IsString()
  prayerTopic: string;

  @IsNotEmpty()
  @IsString()
  vision: string;

  @IsNotEmpty()
  @IsString()
  coupleActivity: string;

  @IsNotEmpty()
  @IsString()
  expectedMeeting: string;

  @IsNotEmpty()
  @IsString()
  merit: string;

  @IsNotEmpty()
  @IsObject()
  profileImage:Record<string, any>;
}
