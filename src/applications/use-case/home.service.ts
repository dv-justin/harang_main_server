import { Injectable } from '@nestjs/common';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { HomeServicePort } from '../port/in-bound/home.service.port';
import { TieServicePort } from '../port/in-bound/tie.service.port';

@Injectable()
export class HomeService implements HomeServicePort {
  constructor(
    private readonly tieServicePort: TieServicePort,
    private readonly userServicePort: UserServicePort,
  ) {}

  async getHome(user_id: number): Promise<any> {
    return await this.tieServicePort.getTiesForHome(user_id);
  }
}
