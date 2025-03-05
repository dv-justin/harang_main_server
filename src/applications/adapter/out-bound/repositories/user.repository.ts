import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/applications/domain/entities/user.entity';
import { UserInterface } from 'src/applications/port/out-bound/interfaces/user.interface';
import { UserRepositoryPort } from 'src/applications/port/out-bound/repositories/user.repository.port';
import { FindOptionsWhere, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { FindOneOptions } from '../interfaces/user-findone-options.interface';
import { ResponseUserFindOneDto } from '../dtos/responses/response-user-findone.dto';
import { UserUpdateInterface } from '../interfaces/user-update.interface';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(
    options: FindOneOptions<UserEntity>,
  ): Promise<ResponseUserFindOneDto> {
    const user_entity = this.userRepository.findOne(options);

    const user_dto = plainToInstance(ResponseUserFindOneDto, user_entity);

    return user_dto;
  }

  async save(user: UserInterface): Promise<void> {
    await this.userRepository.save(user);
  }

  async update(
    options: FindOptionsWhere<UserEntity>,
    user: UserUpdateInterface,
  ): Promise<void> {
    await this.userRepository.update(options, user);
  }

  async delete(user_id: number): Promise<void> {
    await this.userRepository.softDelete(user_id);
  }
}
