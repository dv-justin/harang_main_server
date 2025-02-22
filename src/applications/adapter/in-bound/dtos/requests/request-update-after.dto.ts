import { IsBoolean, IsNotEmpty } from 'class-validator';

export class RequestUpdateAfterDto {
  @IsNotEmpty()
  @IsBoolean()
  user_after: boolean;
}
