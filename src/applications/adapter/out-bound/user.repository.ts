import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/applications/domain/entities/user.entity';
import { UserInterface } from 'src/applications/port/out-bound/interfaces/user';
import { UserRepositoryPort } from 'src/applications/port/out-bound/user.repository.port';
import { Repository } from 'typeorm';
import { ResponseFindByPhoneNumberDto } from './dtos/responses/response-find-one-by-phone-number.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseFindOneByUserIdDto } from './dtos/responses/response-find-one-user-id.dto';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneUserId(user_id: number): Promise<ResponseFindOneByUserIdDto> {
    const user_entity = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        status: true,
        name: true,
        birthdate: true,
        gender: true,
        phone_number: true,
        region_level1: true,
        region_level2: true,
        church_name: true,
        pastor_name: true,
        school_and_major: true,
        company_name: true,
        your_faith: true,
        influential_verse: true,
        prayer_topic: true,
        vision: true,
        couple_activity: true,
        expected_meeting: true,
        merit: true,
      },
    });

    const user_dto = plainToInstance(ResponseFindOneByUserIdDto, user_entity);

    return user_dto;
  }

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
