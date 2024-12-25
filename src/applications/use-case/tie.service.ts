import { Injectable } from '@nestjs/common';
import { TieRepositoryPort } from '../port/out-bound/tie.repository.port';
import { TieServicePort } from '../port/in-bound/tie.service.port';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { ResponseGetTiesForDirectDto } from './dtos/responses/response-get-ties-for-direct.dto';
import { ResponseGetTiesForHomeDto } from './dtos/responses/response-get-ties-for-home.dto';

@Injectable()
export class TieService implements TieServicePort {
  constructor(
    private readonly tieRepositoryPort: TieRepositoryPort,
    private readonly userServicePort: UserServicePort,
  ) {}

  async getTiesForDirect(
    user_id: number,
  ): Promise<ResponseGetTiesForDirectDto[]> {
    const user = await this.userServicePort.getUserId(user_id);
    const ties = await this.tieRepositoryPort.findBy(user_id, user?.gender);

    return ties
      .filter((tie) => {
        return tie.meeting_status;
      })
      .map(
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
            id:
              user?.gender === 'man' ? tie?.female_user?.id : tie?.man_user?.id,
            name:
              user?.gender === 'man'
                ? tie?.female_user?.name
                : tie?.man_user?.name,
            meetingStatus: tie?.meeting_status,
            isMyTicket:
              user?.gender === 'man'
                ? tie?.man_user_ticket_used
                : tie?.female_user_ticket_used,
          };
        },
      );
  }

  async getTiesForHome(user_id: number): Promise<ResponseGetTiesForHomeDto> {
    const user = await this.userServicePort.getUserId(user_id);
    const ties = await this.tieRepositoryPort.findBy(user_id, user?.gender);

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

  private getLatestMatchWithin24Hours(matchs: any) {
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
}
