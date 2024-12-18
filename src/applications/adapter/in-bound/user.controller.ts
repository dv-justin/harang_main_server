import { Controller, Get, Param, UseFilters, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserServicePort } from 'src/applications/port/in-bound/user.service.port';
import { ResponseGetUserIdDto } from './dtos/responses/reponse-get-user-id.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtExceptionFilter } from 'src/filters/jwt-exception.filter';

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
}
