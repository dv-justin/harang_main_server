import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/applications/domain/entities/user.entity';
import { UserInterface } from 'src/applications/port/out-bound/interfaces/user.interface';
import { UserRepositoryPort } from 'src/applications/port/out-bound/user.repository.port';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { FindOneOptions } from './interfaces/user-findone-options.interface';
import { ResponseUserFindOneDto } from './dtos/responses/response-user-findone.dto';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(options: FindOneOptions<UserEntity>): Promise<any> {
    const user_entity = this.userRepository.findOne(options);

    const user_dto = plainToInstance(ResponseUserFindOneDto, user_entity);

    return user_dto;
  }

  async save(user: UserInterface): Promise<void> {
    await this.userRepository.save(user);
  }
}
