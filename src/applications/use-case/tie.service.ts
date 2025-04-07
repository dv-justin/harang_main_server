import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TieRepositoryPort } from '../port/out-bound/repositories/tie.repository.port';
import { TieServicePort } from '../port/in-bound/tie.service.port';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { ResponseGetTiesForDirectDto } from './dtos/responses/response-get-ties-for-direct.dto';
import { ResponseTieFindDto } from '../adapter/out-bound/dtos/responses/response-tie-find.dto';
import { ResponseGetTieMatchStatusDto } from './dtos/responses/response-get-tie-match-status.dto';
import { ResponseGetTieDto } from './dtos/responses/response-get-tie.dto';
import { ResponseGetTiesForHomeDto } from './dtos/responses/response-get-ties-for-home.dto';
import { RequestUpdateAfterDto } from '../adapter/in-bound/dtos/requests/request-update-after.dto';
import { NotificationServicePort } from '../port/in-bound/notification.service.port';

@Injectable()
export class TieService implements TieServicePort {
  constructor(
    private readonly tieRepositoryPort: TieRepositoryPort,

    @Inject(forwardRef(() => UserServicePort))
    private readonly userServicePort: UserServicePort,
    private readonly notificationServicePort: NotificationServicePort,
  ) {}

  async getTiesForDirect(
    user_id: number,
  ): Promise<ResponseGetTiesForDirectDto[]> {
    const user = await this.userServicePort.getUserId(user_id, false);

    const ties = await this.tieRepositoryPort.find({
      where: {
        ...(user?.gender === 'man'
          ? { man_user: { id: user_id } }
          : { female_user: { id: user_id } }),
        is_failed: false,
      },

      select: [
        'id',
        'man_user',
        'female_user',
        'meeting_status',
        'is_failed',
        'man_user_ticket_used',
        'female_user_ticket_used',
        'all_tickets_used_by',
      ],
    });
    console.log('ties', ties);
    return ties
      .filter((tie) => {
        return (
          tie.meeting_status === 1 &&
          ((tie?.man_user_ticket_used && !tie?.female_user_ticket_used) ||
            (!tie?.man_user_ticket_used && tie?.female_user_ticket_used) ||
            (tie?.man_user_ticket_used && tie?.female_user_ticket_used))
        );
      })
      .map(
        (tie: {
          id: number;
          man_user?: {
            id: number;
            name: string;
          };
          female_user?: {
            id: number;
            name: string;
          };
          meeting_status?: number;
          is_failed?: boolean;
          man_user_ticket_used?: boolean;
          female_user_ticket_used?: boolean;
          all_tickets_used_by?: boolean;
        }) => {
          return {
            id: tie?.id,
            name:
              user?.gender === 'man'
                ? tie?.female_user?.name
                : tie?.man_user?.name,
            meetingStatus: tie?.meeting_status,
            yourUserId:
              user?.gender === 'man' ? tie?.female_user?.id : tie?.man_user?.id,
            isMyTicket:
              user?.gender === 'man'
                ? tie?.man_user_ticket_used
                : tie?.female_user_ticket_used,
            isYourTicket:
              user?.gender === 'female'
                ? tie?.man_user_ticket_used
                : tie?.female_user_ticket_used,
            allTicketsUsedBy: tie?.all_tickets_used_by,
          };
        },
      );
  }

  async getTiesForHome(user_id: number): Promise<ResponseGetTiesForHomeDto> {
    const user = await this.userServicePort.getUserId(user_id, false);
    const ties = await this.tieRepositoryPort.find({
      where:
        user?.gender === 'man'
          ? { man_user: { id: user_id } }
          : { female_user: { id: user_id } },
      select: ['man_user', 'female_user'],
    });

    const matchs = ties?.filter((tie) => {
      return !tie?.meeting_status;
    });

    const latest_match = this.getLatestMatchWithin48Hours(matchs);

    const match_user =
      user?.gender === 'man'
        ? latest_match?.female_user
        : latest_match?.man_user;

    const id = match_user?.id || null;
    const name = match_user?.name || null;
    const gender = match_user?.gender || null;
    const address = match_user?.region_level1
      ? `${match_user?.region_level1} ${match_user?.region_level2}`
      : null;

    return {
      id,
      name,
      gender,
      address,
    };
  }

  async getTieMatchStatus(
    user_id: number,
  ): Promise<ResponseGetTieMatchStatusDto> {
    const user = await this.userServicePort.getUserId(user_id, false);
    const tie = await this.tieRepositoryPort.findOne({
      where:
        user?.gender === 'man'
          ? { man_user: { id: user_id } }
          : { female_user: { id: user_id } },
      select: [
        'id',
        'man_user_ticket_used',
        'female_user_ticket_used',
        'all_tickets_used_by',
      ],
    });

    const {
      man_user_ticket_used,
      female_user_ticket_used,
      all_tickets_used_by,
    } = tie;

    return {
      man_user_ticket_used,
      female_user_ticket_used,
      all_tickets_used_by,
    };
  }

  private getLatestMatchWithin48Hours(
    matchs: ResponseTieFindDto[],
  ): ResponseTieFindDto {
    const now = new Date().getTime();
    const twenty_four_hours_ago = new Date(now - 24 * 60 * 60 * 1000 * 2);
    const latest_matchs = matchs?.filter((tie) => {
      return new Date(tie.created_at) >= twenty_four_hours_ago;
    });

    const latest_match = latest_matchs?.sort(
      (a, b) =>
        new Date(b?.created_at).getTime() - new Date(a?.created_at).getTime(),
    )[0];

    return latest_match;
  }
}
