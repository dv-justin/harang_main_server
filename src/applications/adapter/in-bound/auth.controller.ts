import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthServicePort } from 'src/applications/port/in-bound/auth.service.port';
import { UserServicePort } from 'src/applications/port/in-bound/user.service.port';
import { RequestSaveUserDto } from './dtos/requests/request-save-user.dto';
import { ResponseLoginDto } from './dtos/responses/reponse-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authServicePort: AuthServicePort,
    private readonly userServicePort: UserServicePort,
  ) {}

  @Get('/phone-number/:phone_number')
  @ApiOperation({
    summary: '회원 휴대폰 번호 조회 api',
    description: '회원 휴대폰 번호 조회 api',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseLoginDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async login(
    @Param('phone_number') phone_number: string,
  ): Promise<ResponseLoginDto> {
    const user = await this.userServicePort.getUserPhoneNumber(phone_number);

    return user;
  }

  @Get('/:refresh_token')
  @ApiOperation({
    summary: '엑세스토큰 재발급',
    description: '엑세스토큰 재발급',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    // type: ResponseGetUserPhoneNumberDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async refreshAccessToken(
    @Param('refresh_token') refresh_token: string,
  ): Promise<any> {
    return await this.authServicePort.refreshAccessToken(refresh_token);
  }

  @Post()
  @ApiOperation({
    summary: '회원 생성 api',
    description: '회원을 생성하는 api',
  })
  @ApiResponse({
    status: 201,
    description: '성공',
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async register(@Body() dto: RequestSaveUserDto): Promise<void> {
    await this.authServicePort.register(dto);
  }
}
