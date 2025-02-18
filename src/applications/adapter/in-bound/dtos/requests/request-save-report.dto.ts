import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RequestSaveReportDto {
  @IsNotEmpty()
  @IsNumber()
  offender_user_id: number;

  @IsNotEmpty()
  @IsString()
  contents: string;
}
