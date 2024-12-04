import { ResponseFindByPhoneNumberDto } from 'src/applications/adapter/out-bound/dtos/response/response-find-by-phone-number.dto';
import { UserInterface } from './interfaces/user';

export abstract class UserRepositoryPort {
  findOneByPhoneNumber: (
    phone_number: string,
  ) => Promise<ResponseFindByPhoneNumberDto>;
  save: (user: UserInterface) => Promise<void>;
}
