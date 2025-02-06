import { IsString, IsNotEmpty } from 'class-validator';

export class ResponseLoginDto {
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
