import { ResponseFindByPhoneNumberDto } from 'src/applications/adapter/out-bound/dtos/responses/response-find-one-by-phone-number.dto';
import { UserInterface } from './interfaces/user';

export abstract class UserRepositoryPort {
  findOneUserId: (user_id: number) => Promise<any>;
  findOneByPhoneNumber: (
    phone_number: string,
  ) => Promise<ResponseFindByPhoneNumberDto>;
  save: (user: UserInterface) => Promise<void>;
}
