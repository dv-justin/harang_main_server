import { ResponseTieFindDto } from 'src/applications/adapter/out-bound/dtos/responses/response-tie-find.dto';
import { ResponseTieFindOneDto } from 'src/applications/adapter/out-bound/dtos/responses/response-tie-findone.dto';
import { FindOptions } from 'src/applications/adapter/out-bound/interfaces/tie-find-options.interface';
import { FindOneOptions } from 'src/applications/adapter/out-bound/interfaces/tie-findone-options.interface';
import { UserMatchEntity } from 'src/applications/domain/entities/user-match.entity';

export abstract class TieRepositoryPort {
  find: (
    options: FindOptions<UserMatchEntity>,
  ) => Promise<ResponseTieFindDto[]>;
  findOne: (
    options: FindOneOptions<UserMatchEntity>,
  ) => Promise<ResponseTieFindOneDto>;
}
