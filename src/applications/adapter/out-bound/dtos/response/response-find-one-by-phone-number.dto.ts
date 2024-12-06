import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseFindByPhoneNumberDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
