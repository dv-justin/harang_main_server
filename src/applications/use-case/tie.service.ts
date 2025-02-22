import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TieRepositoryPort } from '../port/out-bound/tie.repository.port';
import { TieServicePort } from '../port/in-bound/tie.service.port';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { ResponseGetTiesForDirectDto } from './dtos/responses/response-get-ties-for-direct.dto';
import { ResponseTieFindDto } from '../adapter/out-bound/dtos/responses/response-tie-find.dto';
import { ResponseGetTieMatchStatusDto } from './dtos/responses/response-get-tie-match-status.dto';
import { ResponseGetTieDto } from './dtos/responses/response-get-tie.dto';
import { ResponseGetTiesForHomeDto } from './dtos/responses/response-get-ties-for-home.dto';
import { RequestUpdateAfterDto } from '../adapter/in-bound/dtos/requests/request-update-after.dto';
import { PatchInterface } from '../adapter/out-bound/interfaces/tie-patch.interface';

@Injectable()
export class TieService implements TieServicePort {
  constructor(
    private readonly tieRepositoryPort: TieRepositoryPort,

    @Inject(forwardRef(() => UserServicePort))
    private readonly userServicePort: UserServicePort,
  ) {}

  async getTiesForDirect(
    user_id: number,
  ): Promise<ResponseGetTiesForDirectDto[]> {
    const user = await this.userServicePort.getUserId(user_id, false);

    const ties = await this.tieRepositoryPort.find({
      where:
        user?.gender === 'man'
          ? { man_user: { id: user_id } }
          : { female_user: { id: user_id } },
      select: [
        'id',
        'man_user',
        'female_user',
        'meeting_status',
        'is_failed',
        'man_user_ticket_used',
        'female_user_ticket_used',
        'man_user_after',
        'female_user_after',
      ],
    });

    return ties
      .filter((tie) => {
        return tie.meeting_status;
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
          man_user_after?: boolean;
          female_user_after?: boolean;
        }) => {
          return {
            id: tie?.id,
            name:
              user?.gender === 'man'
                ? tie?.female_user?.name
                : tie?.man_user?.name,
            meetingStatus: tie?.meeting_status,
            isMyTicket:
              user?.gender === 'man'
                ? tie?.man_user_ticket_used
                : tie?.female_user_ticket_used,
            isMyAfter:
              user?.gender === 'man'
                ? tie?.man_user_after
                : tie?.female_user_after,
            isYourAfter:
              user?.gender === 'man'
                ? tie?.female_user_after
                : tie?.man_user_after,
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

    const meeting_info_list = ties
      ?.filter((tie) => tie?.meeting_status === 2)
      ?.map((tie) => {
        const { meeting_location, meeting_address, meeting_schedule } = tie;
        return {
          meetingLocation: meeting_location,
          meetingAddress: meeting_address,
          meetingSchedule: meeting_schedule,
        };
      });

    const matchs = ties?.filter((tie) => {
      return !tie?.meeting_status;
    });

    const latest_match = this.getLatestMatchWithin24Hours(matchs);

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
      meetingInfoList: meeting_info_list,
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

  async getTie(tie_id: number): Promise<ResponseGetTieDto> {
    const tie = await this.tieRepositoryPort.findOne({
      where: { id: tie_id },
      select: ['meeting_address', 'meeting_location', 'meeting_schedule'],
    });

    const {
      meeting_address: meetingAddress,
      meeting_location: meetingLocation,
      meeting_schedule: meetingSchedule,
    } = tie;

    return { meetingAddress, meetingLocation, meetingSchedule };
  }

  async updateAfter(
    user_id: number,
    tie_id: number,
    dto: RequestUpdateAfterDto,
  ) {
    const { user_after } = dto;
    const user = await this.userServicePort.getUserId(user_id, false);
    const data = this.mapUserAfterByGender(user?.gender, user_after);

    await this.tieRepositoryPort.patch(tie_id, data);
  }

  private getLatestMatchWithin24Hours(
    matchs: ResponseTieFindDto[],
  ): ResponseTieFindDto {
    const now = new Date().getTime();
    const twenty_four_hours_ago = new Date(now - 24 * 60 * 60 * 1000);
    const latest_matchs = matchs?.filter((tie) => {
      return new Date(tie.created_at) >= twenty_four_hours_ago;
    });

    const latest_match = latest_matchs?.sort(
      (a, b) =>
        new Date(b?.created_at).getTime() - new Date(a?.created_at).getTime(),
    )[0];

    return latest_match;
  }

  private mapUserAfterByGender(
    gender: string,
    user_after: boolean,
  ): PatchInterface {
    if (gender === 'man') {
      return { man_user_after: user_after };
    }
    if (gender === 'female') {
      return { female_user_after: user_after };
    }
  }
}
