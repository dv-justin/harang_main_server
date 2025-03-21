import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Patch,
  UseFilters,
  UseGuards,
  Delete,
  HttpCode,
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
import { RequestUpdateIdealTypeDto } from './dtos/requests/request-update-ideal-type.dto';
import { ResponseUpdateIdealTypeDto } from './dtos/responses/response-update-ideal-type.dto';
import { ResponseGetIdealTypeDto } from './dtos/responses/response-get-ideal-type.dto';

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
    @Query('include_match') include_match: boolean,
  ): Promise<ResponseGetUserIdDto> {
    const user = await this.userServicePort.getUserId(user_id, include_match);
    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtExceptionFilter)
  @ApiOperation({
    summary: '회원 user_id 토큰 조회 api',
    description: '회원 user_id 토큰 조회 api',
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
    summary: '회원 수정 api',
    description: '회원 수정 api',
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

  @Get('ideal-type')
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtExceptionFilter)
  @ApiOperation({
    summary: '이상형 조회 api',
    description: '이상형 조회 api',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseGetIdealTypeDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async getIdealType(
    @User() user_id: number,
  ): Promise<ResponseGetIdealTypeDto> {
    return await this.userServicePort.getIdealType(user_id);
  }

  @Patch('ideal-type')
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtExceptionFilter)
  @ApiOperation({
    summary: '이상형 수정 api',
    description: '이상형 수정 api',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseUpdateIdealTypeDto,
  })
  async updateIdealType(
    @User() user_id: number,
    @Body() dto: RequestUpdateIdealTypeDto,
  ): Promise<ResponseUpdateIdealTypeDto> {
    return await this.userServicePort.updateIdealType(user_id, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtExceptionFilter)
  @ApiOperation({
    summary: '회원 탈퇴 api',
    description: '회원 탈퇴 api',
  })
  @ApiResponse({
    status: 204,
    description: '성공',
    type: ResponseGetUserIdDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  @HttpCode(204)
  async deleteUser(@User() user_id: number): Promise<void> {
    await this.userServicePort.deleteUser(user_id);
  }
}
