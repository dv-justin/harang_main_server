import { Injectable } from '@nestjs/common';
import { RequestSaveUserDto } from 'src/applications/adapter/in-bound/dtos/requests/request-save-user.dto';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { UserRepositoryPort } from '../port/out-bound/user.repository.port';
import { ResponseGetUserPhoneNumberDto } from './dtos/response/response-get-user-phone-number.dto';
import { AuthServicePort } from '../port/in-bound/auth.service.port';
import { ResponseGetUserIdDto } from './dtos/response/reponse-get-user-id.dto';

@Injectable()
export class UserService implements UserServicePort {
  constructor(
    private readonly userRepositoryPort: UserRepositoryPort,
    private readonly authServicePort: AuthServicePort,
  ) {}

  async getUserId(user_id: number): Promise<ResponseGetUserIdDto> {
    return await this.userRepositoryPort.findOneUserId(user_id);
  }

  async getUserPhoneNumber(
    phone_number: string,
  ): Promise<ResponseGetUserPhoneNumberDto> {
    const user =
      await this.userRepositoryPort.findOneByPhoneNumber(phone_number);

    const tokens = await this.authServicePort.generateTokens(user?.id);
    const return_user = { status: user?.status, ...tokens };
    return return_user;
  }

  async saveUser(dto: RequestSaveUserDto): Promise<void> {
    const save_user = { ...dto };

    const user = await this.userRepositoryPort.findOneByPhoneNumber(
      save_user?.phone_number,
    );

    if (user) {
      return;
    }

    await this.userRepositoryPort.save(save_user);
  }
}
