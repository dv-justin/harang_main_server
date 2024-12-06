import { Injectable } from '@nestjs/common';
import { AuthServicePort } from '../port/in-bound/auth.service.port';
import { JwtService } from '@nestjs/jwt';
import { ResponseGenerateTokensDto } from './dtos/response/response-generate-tokens.dto';

@Injectable()
export class AuthService implements AuthServicePort {
  constructor(private jwtService: JwtService) {}

  async generateTokens(user_id: number): Promise<ResponseGenerateTokensDto> {
    const access_token = await this.jwtService.signAsync({ user_id });

    const refresh_token = await this.jwtService.signAsync({ user_id });
    return { access_token, refresh_token };
  }
}
