import { Injectable } from '@nestjs/common';
import { TieRepositoryPort } from '../port/out-bound/tie.repository.port';
import { TieServicePort } from '../port/in-bound/tie.service.port';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { ResponseGetTieDto } from './dtos/response/response-get-ties.dto';

@Injectable()
export class TieService implements TieServicePort {
  constructor(
    private readonly tieRepositoryPort: TieRepositoryPort,
    private readonly userServicePort: UserServicePort,
  ) {}

  async getTies(user_id: number): Promise<ResponseGetTieDto[]> {
    const user = await this.userServicePort.getUserId(user_id);
    const ties = await this.tieRepositoryPort.findBy(user_id, user?.gender);

    return ties;
  }
}
