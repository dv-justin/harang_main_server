import { ResponseGenerateTokensDto } from 'src/applications/use-case/dtos/response/response-generate-tokens.dto';

export abstract class AuthServicePort {
  generateTokens: (user_id: number) => Promise<ResponseGenerateTokensDto>;
}
