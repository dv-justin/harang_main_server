import { Injectable } from '@nestjs/common';
import { RequestSaveUserDto } from 'src/applications/adapter/in-bound/dtos/requests/request-save-user.dto';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { UserRepositoryPort } from '../port/out-bound/user.repository.port';
import { ResponseGetUserPhoneNumberDto } from './dtos/response/response-get-user-phone-number.dto';

@Injectable()
export class UserService implements UserServicePort {
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {}

  async getUserPhoneNumber(
    phone_number: string,
  ): Promise<ResponseGetUserPhoneNumberDto> {
    const user =
      await this.userRepositoryPort.findOneByPhoneNumber(phone_number);
    const return_user = { ...user };
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
