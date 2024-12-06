import { IsString, IsNotEmpty } from 'class-validator';

export class ResponseGetUserPhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @IsNotEmpty()
  @IsString()
  refresh_token: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
