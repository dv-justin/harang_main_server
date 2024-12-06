import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TieRepositoryPort } from 'src/applications/port/out-bound/tie.repository.port';
import { UserMatchMeetingEntity } from 'src/applications/domain/entities/user-match-meeting.entity';
import { ResponseFindByTieDto } from './dtos/response/response-find-by-tie.dto';

@Injectable()
export class TieRepository implements TieRepositoryPort {
  constructor(
    @InjectRepository(UserMatchMeetingEntity)
    private readonly userMatchMeetingRepository: Repository<UserMatchMeetingEntity>,
  ) {}

  async findBy(
    user_id: number,
    gender: string,
  ): Promise<ResponseFindByTieDto[]> {
    const tie_entity = await this.userMatchMeetingRepository.find({
      where:
        gender === 'man'
          ? { man_user: { id: user_id } }
          : { female_user: { id: user_id } },
      relations: {
        man_user: true,
        female_user: true,
      },
      select: {
        man_user: {
          id: true,
        },
        female_user: {
          id: true,
        },
      },
    });

    const tie_dto = plainToInstance(ResponseFindByTieDto, tie_entity, {
      excludeExtraneousValues: true,
    });

    return tie_dto;
  }
}
