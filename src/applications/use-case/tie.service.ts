import { Injectable } from '@nestjs/common';
import { TieRepositoryPort } from '../port/out-bound/tie.repository.port';
import { TieServicePort } from '../port/in-bound/tie.service.port';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { ResponseGetTieDto } from './dtos/responses/response-get-ties.dto';

@Injectable()
export class TieService implements TieServicePort {
  constructor(
    private readonly tieRepositoryPort: TieRepositoryPort,
    private readonly userServicePort: UserServicePort,
  ) {}

  async getTies(user_id: number): Promise<ResponseGetTieDto[]> {
    const user = await this.userServicePort.getUserId(user_id);
    const ties = await this.tieRepositoryPort.findBy(user_id, user?.gender);

    return ties.map(
      (tie: {
        man_user: {
          id: number;
          name: string;
        };
        female_user: {
          id: number;
          name: string;
        };
        meeting_status: number;
        is_failed: boolean;
        man_user_ticket_used: boolean;
        female_user_ticket_used: boolean;
      }) => {
        return {
          id: user?.gender === 'man' ? tie?.female_user?.id : tie?.man_user?.id,
          name:
            user?.gender === 'man'
              ? tie?.female_user?.name
              : tie?.man_user?.name,
          meetingStatus: tie?.meeting_status,
          isFailed: tie?.is_failed,
          isMyTicket:
            user?.gender === 'man'
              ? tie?.man_user_ticket_used
              : tie?.female_user_ticket_used,
          isOpponentTicket:
            user?.gender === 'man'
              ? tie?.female_user_ticket_used
              : tie?.man_user_ticket_used,
        };
      },
    );
  }
}
