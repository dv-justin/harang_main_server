import { RequestUpdateAfterDto } from 'src/applications/adapter/in-bound/dtos/requests/request-update-after.dto';
import { ResponseGetTieMatchStatusDto } from 'src/applications/use-case/dtos/responses/response-get-tie-match-status.dto';
import { ResponseGetTieDto } from 'src/applications/use-case/dtos/responses/response-get-tie.dto';
import { ResponseGetTiesForDirectDto } from 'src/applications/use-case/dtos/responses/response-get-ties-for-direct.dto';
import { ResponseGetTiesForHomeDto } from 'src/applications/use-case/dtos/responses/response-get-ties-for-home.dto';

export abstract class TieServicePort {
  getTiesForDirect: (user_id: number) => Promise<ResponseGetTiesForDirectDto[]>;
  getTiesForHome: (user_id: number) => Promise<ResponseGetTiesForHomeDto>;
  getTieMatchStatus: (user_id: number) => Promise<ResponseGetTieMatchStatusDto>;
  getTie: (tie_id: number) => Promise<ResponseGetTieDto>;
  updateAfter: (
    user_id: number,
    tie_id: number,
    dto: RequestUpdateAfterDto,
  ) => Promise<void>;
}
