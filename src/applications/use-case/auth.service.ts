import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthServicePort } from '../port/in-bound/auth.service.port';
import { JwtService } from '@nestjs/jwt';
import { ResponseGenerateTokensDto } from './dtos/responses/response-generate-tokens.dto';
import { ConfigService } from '@nestjs/config';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { ResponseLoginDto } from './dtos/responses/response-login.dto';
import { RequestSaveUserDto } from '../adapter/in-bound/dtos/requests/request-save-user.dto';

@Injectable()
export class AuthService implements AuthServicePort {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,

    @Inject(forwardRef(() => UserServicePort))
    private readonly userServicePort: UserServicePort,
  ) {}

  async login(phone_number: string): Promise<ResponseLoginDto> {
    const user = await this.userServicePort.getUserPhoneNumber(phone_number);

    return user;
  }

  async register(dto: RequestSaveUserDto): Promise<void> {
    await this.userServicePort.saveUser(dto);
  }

  async generateTokens(user_id: number): Promise<ResponseGenerateTokensDto> {
    const access_token = await this.jwtService.signAsync({ user_id });

    const refresh_token = await this.jwtService.signAsync(
      { user_id },
      {
        expiresIn: '20d',
      },
    );
    return { access_token, refresh_token };
  }

  async refreshAccessToken(refresh_token: string) {
    try {
      const payload = this.jwtService.verify(refresh_token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      const user = await this.userServicePort.getUserId(payload?.sub);
      if (!user) {
        return 'user error';
      }

      const access_token = await this.jwtService.signAsync(
        { user_id: user?.id },
        {
          expiresIn: '90d',
        },
      );

      return { access_token };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
