import { IsString, IsNotEmpty } from 'class-validator';

export class ResponseGenerateTokensDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
