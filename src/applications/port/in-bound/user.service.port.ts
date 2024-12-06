import { RequestSaveUserDto } from 'src/applications/adapter/in-bound/dtos/requests/request-save-user.dto';
import { ResponseGetUserIdDto } from 'src/applications/use-case/dtos/response/reponse-get-user-id.dto';
import { ResponseGetUserPhoneNumberDto } from 'src/applications/use-case/dtos/response/response-get-user-phone-number.dto';

export abstract class UserServicePort {
  getUserId: (user_id: number) => Promise<ResponseGetUserIdDto>;
  getUserPhoneNumber: (
    phone_number: string,
  ) => Promise<ResponseGetUserPhoneNumberDto>;
  saveUser: (dto: RequestSaveUserDto) => Promise<void>;
}
