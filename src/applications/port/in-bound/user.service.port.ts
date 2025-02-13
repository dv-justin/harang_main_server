import { RequestSaveUserDto } from 'src/applications/adapter/in-bound/dtos/requests/request-save-user.dto';
import { RequestUpdateUserDto } from 'src/applications/adapter/in-bound/dtos/requests/request-update-user.dto';
import { ResponseGetIdealTypeDto } from 'src/applications/use-case/dtos/responses/response-get-ideal-type.dto';
import { ResponseGetUserIdTokenDto } from 'src/applications/use-case/dtos/responses/response-get-user-id-token.dto';
import { ResponseGetUserIdDto } from 'src/applications/use-case/dtos/responses/response-get-user-id.dto';
import { ResponseGetUserPhoneNumberDto } from 'src/applications/use-case/dtos/responses/response-get-user-phone-number.dto';

export abstract class UserServicePort {
  getUserId: (
    user_id: number,
    include_match: boolean,
  ) => Promise<ResponseGetUserIdDto>;
  getUserIdToken: (user_id: number) => Promise<ResponseGetUserIdTokenDto>;
  getUserPhoneNumber: (
    phone_number: string,
  ) => Promise<ResponseGetUserPhoneNumberDto>;
  saveUser: (dto: RequestSaveUserDto) => Promise<void>;
  updateUser: (user_id: number, dto: RequestUpdateUserDto) => Promise<void>;
  getIdealType: (user_id: number) => Promise<ResponseGetIdealTypeDto>
}
