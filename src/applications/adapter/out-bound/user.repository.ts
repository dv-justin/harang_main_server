import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/applications/domain/entities/user.entity';
import { UserInterface } from 'src/applications/port/out-bound/interfaces/user';
import { UserRepositoryPort } from 'src/applications/port/out-bound/user.repository.port';
import { Repository } from 'typeorm';
import { ResponseFindByPhoneNumberDto } from './dtos/response/response-find-by-phone-number.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByPhoneNumber(
    phone_number: string,
  ): Promise<ResponseFindByPhoneNumberDto> {
    const user_entity = await this.userRepository.findOneBy({ phone_number });

    const user_dto = plainToInstance(ResponseFindByPhoneNumberDto, user_entity);

    return user_dto;
  }

  async save(user: UserInterface): Promise<void> {
    await this.userRepository.save(user);
  }
}
