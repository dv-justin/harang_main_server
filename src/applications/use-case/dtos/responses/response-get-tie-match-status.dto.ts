import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseGetTieMatchStatusDto {
  @IsNumber()
  @IsNotEmpty()
  man_user_ticket_used: number;

  @IsString()
  @IsNotEmpty()
  all_tickets_used_by: string;

  @IsNumber()
  @IsNotEmpty()
  female_user_ticket_used: number;
}
