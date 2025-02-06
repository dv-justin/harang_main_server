import { ResponseGetTiesForHomeDto } from 'src/applications/use-case/dtos/responses/response-get-ties-for-home.dto';

export abstract class HomeServicePort {
  getHome: (user_id: number) => Promise<ResponseGetTiesForHomeDto>;
}
