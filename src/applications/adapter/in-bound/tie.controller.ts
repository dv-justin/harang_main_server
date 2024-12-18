import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { TieServicePort } from 'src/applications/port/in-bound/tie.service.port';
import { JwtExceptionFilter } from 'src/filters/jwt-exception.filter';
import { ResponseGetTieDto } from './dtos/responses/response-get-tie.dto';

@ApiTags('ties')
@Controller('ties')
@ApiBearerAuth()
export class TieController {
  constructor(private readonly tieServicePort: TieServicePort) {}

  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtExceptionFilter)
  @Get()
  @ApiOperation({
    summary: '인연 조회 api',
    description: '인연 조회 api',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseGetTieDto,
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  async getTies(@User() user_id: number): Promise<ResponseGetTieDto[]> {
    return await this.tieServicePort.getTies(user_id);
  }
}
