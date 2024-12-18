import { ResponseFindByTieDto } from 'src/applications/adapter/out-bound/dtos/responses/response-find-by-tie.dto';

export abstract class TieRepositoryPort {
  findBy: (user_id: number, gender: string) => Promise<ResponseFindByTieDto[]>;
}
