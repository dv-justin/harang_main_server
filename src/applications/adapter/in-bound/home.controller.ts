import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { HomeServicePort } from 'src/applications/port/in-bound/home.service.port';

@ApiTags('homes')
@Controller('homes')
@ApiBearerAuth()
export class HomeController {
  constructor(private readonly homeServicePort: HomeServicePort) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: '홈 조회 api',
    description: '홈 조회 api',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    // type: ResponseGetTieDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async getTies(@User() user_id: number): Promise<any> {
    return await this.homeServicePort.getHome(user_id);
  }
}
