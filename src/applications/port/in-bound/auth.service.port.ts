import { RequestSaveUserDto } from 'src/applications/adapter/in-bound/dtos/requests/request-save-user.dto';
import { ResponseGenerateTokensDto } from 'src/applications/use-case/dtos/responses/response-generate-tokens.dto';
import { ResponseLoginDto } from 'src/applications/use-case/dtos/responses/response-login.dto';

export abstract class AuthServicePort {
  register: (dto: RequestSaveUserDto) => Promise<void>;
  login: (phone_number: string) => Promise<ResponseLoginDto>;
  generateTokens: (user_id: number) => Promise<ResponseGenerateTokensDto>;
  refreshAccessToken: (refresh_token: string) => Promise<any>;
}
