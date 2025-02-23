import { UserInterface } from './interfaces/user.interface';
import { FindOneOptions } from 'src/applications/adapter/out-bound/interfaces/user-findone-options.interface';
import { UserEntity } from 'src/applications/domain/entities/user.entity';
import { ResponseUserFindOneDto } from 'src/applications/adapter/out-bound/dtos/responses/response-user-findone.dto';
import { FindOptionsWhere } from 'typeorm';
import { UserUpdateInterface } from 'src/applications/adapter/out-bound/interfaces/user-update.interface';

export abstract class UserRepositoryPort {
  findOne: (
    options: FindOneOptions<UserEntity>,
  ) => Promise<ResponseUserFindOneDto>;
  save: (user: UserInterface) => Promise<void>;
  update: (
    options: FindOptionsWhere<UserEntity>,
    user: UserUpdateInterface,
  ) => Promise<void>;
  delete: (user_id: number) => Promise<void>;
}
