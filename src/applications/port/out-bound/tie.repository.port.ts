import { ResponseTieFindDto } from 'src/applications/adapter/out-bound/dtos/responses/response-tie-find.dto';
import { ResponseTieFindOneDto } from 'src/applications/adapter/out-bound/dtos/responses/response-tie-findone.dto';
import { FindOptions } from 'src/applications/adapter/out-bound/interfaces/tie-find-options.interface';
import { FindOneOptions } from 'src/applications/adapter/out-bound/interfaces/tie-findone-options.interface';
import { UserMatchMeetingEntity } from 'src/applications/domain/entities/user-match-meeting.entity';

export abstract class TieRepositoryPort {
  find: (
    options: FindOptions<UserMatchMeetingEntity>,
  ) => Promise<ResponseTieFindDto[]>;
  findOne: (
    options: FindOneOptions<UserMatchMeetingEntity>,
  ) => Promise<ResponseTieFindOneDto>;
}
