import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserServicePort } from 'src/applications/port/in-bound/user.service.port';
import { ResponseGetUserIdDto } from './dtos/responses/response-get-user-id.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtExceptionFilter } from 'src/filters/jwt-exception.filter';
import { User } from 'src/decorators/user.decorator';
import { ResponseGetUserIdTokenDto } from './dtos/responses/response-get-user-id-token.dto';
import { RequestUpdateUserDto } from './dtos/requests/request-update-user.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userServicePort: UserServicePort) {}

  @Get('/:user_id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtExceptionFilter)
  @ApiOperation({
    summary: '회원 user_id 조회 api',
    description: '회원 user_id 조회 api',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseGetUserIdDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async getUserId(
    @Param('user_id') user_id: number,
  ): Promise<ResponseGetUserIdDto> {
    return await this.userServicePort.getUserId(user_id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtExceptionFilter)
  @ApiOperation({
    summary: '회원 user_id 조회 api',
    description: '회원 user_id 조회 api',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseGetUserIdDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async getUserIdToken(
    @User() user_id: number,
  ): Promise<ResponseGetUserIdTokenDto> {
    return await this.userServicePort.getUserIdToken(user_id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtExceptionFilter)
  @ApiOperation({
    summary: '회원 user_id 조회 api',
    description: '회원 user_id 조회 api',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseGetUserIdDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async updateUser(
    @User() user_id: number,
    @Body() dto: RequestUpdateUserDto,
  ): Promise<void> {
    await this.userServicePort.updateUser(user_id, dto);
  }
}
