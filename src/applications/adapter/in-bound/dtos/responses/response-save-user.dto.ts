import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseSaveUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
