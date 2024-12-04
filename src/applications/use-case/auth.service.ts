import { Injectable } from '@nestjs/common';
import { AuthServicePort } from '../port/in-bound/auth.service.port';
import { JwtService } from '@nestjs/jwt';
import { ResponseGenerateTokensDto } from './dtos/response/response-generate-tokens.dto';

@Injectable()
export class AuthService implements AuthServicePort {
  constructor(private jwtService: JwtService) {}

  async generateTokens(user_id: string): Promise<ResponseGenerateTokensDto> {
    const access_token = await this.jwtService.signAsync(
      { user_id },
      { expiresIn: '1h' },
    );

    const refresh_token = await this.jwtService.signAsync(
      { user_id },
      { expiresIn: '7d' },
    );

    return { access_token, refresh_token };
  }
}
