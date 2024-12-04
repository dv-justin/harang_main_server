import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestSaveUserDto } from './dtos/requests/request-save-user.dto';
import { UserServicePort } from 'src/applications/port/in-bound/user.service.port';
import { ResponseGetUserPhoneNumberDto } from './dtos/responses/response-get-user-phone-number.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userServicePort: UserServicePort) {}

  @Get('/phone-number/:phone_number')
  @ApiOperation({
    summary: '회원 휴대폰 번호 조회 api',
    description: '회원 휴대폰 번호 조회 api',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseGetUserPhoneNumberDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async getUserPhoneNumber(
    @Param('phone_number') phone_number: string,
  ): Promise<ResponseGetUserPhoneNumberDto> {
    const user = await this.userServicePort.getUserPhoneNumber(phone_number);

    return user;
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
  async saveUser(@Body() dto: RequestSaveUserDto): Promise<void> {
    await this.userServicePort.saveUser(dto);
  }
}
