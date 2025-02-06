import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TieRepositoryPort } from 'src/applications/port/out-bound/tie.repository.port';
import { UserMatchMeetingEntity } from 'src/applications/domain/entities/user-match-meeting.entity';
import { ResponseTieFindDto } from './dtos/responses/response-tie-find.dto';
import { FindOptions } from './interfaces/tie-find-options.interface';
import { FindOneOptions } from './interfaces/tie-findone-options.interface';
import { ResponseTieFindOneDto } from './dtos/responses/response-tie-findone.dto';

@Injectable()
export class TieRepository implements TieRepositoryPort {
  constructor(
    @InjectRepository(UserMatchMeetingEntity)
    private readonly userMatchMeetingRepository: Repository<UserMatchMeetingEntity>,
  ) {}

  async find(
    options: FindOptions<UserMatchMeetingEntity>,
  ): Promise<ResponseTieFindDto[]> {
    const ties_entity = await this.userMatchMeetingRepository.find({
      ...options,
      relations: {
        man_user: true,
        female_user: true,
      },
    });

    const ties_dto = plainToInstance(ResponseTieFindDto, ties_entity, {
      excludeExtraneousValues: true,
    });

    return ties_dto;
  }

  async findOne(
    options: FindOneOptions<UserMatchMeetingEntity>,
  ): Promise<ResponseTieFindOneDto> {
    const tie_entity = await this.userMatchMeetingRepository.findOne(options);

    const tie_dto = plainToInstance(ResponseTieFindOneDto, tie_entity, {
      excludeExtraneousValues: true,
    });

    return tie_dto;
  }
}
