import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ResponseSaveReport {
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;
}
