import { Injectable } from '@nestjs/common';
import { TieRepositoryPort } from '../port/out-bound/tie.repository.port';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { HomeServicePort } from '../port/in-bound/home.service.port';

@Injectable()
export class HomeService implements HomeServicePort {
  constructor(
    private readonly tieServicePort: TieRepositoryPort,
    private readonly userServicePort: UserServicePort,
  ) {}

  async getHome(user_id: number): Promise<any> {
    const user = await this.userServicePort.getUserId(user_id);
  }
}
