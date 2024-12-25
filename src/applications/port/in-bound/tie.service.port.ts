import { ResponseGetTiesForDirectDto } from 'src/applications/use-case/dtos/responses/response-get-ties-for-direct.dto';

export abstract class TieServicePort {
  getTiesForDirect: (user_id: number) => Promise<ResponseGetTiesForDirectDto[]>;
  getTiesForHome: (user_id: number) => Promise<any>;
}
