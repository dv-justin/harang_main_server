import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ResponseGetTieMatchStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  man_user_ticket_used: boolean;

  @IsString()
  @IsNotEmpty()
  all_tickets_used_by: string;

  @IsBoolean()
  @IsNotEmpty()
  female_user_ticket_used: boolean;
}
