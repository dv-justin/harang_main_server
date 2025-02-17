import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReportServicePort } from 'src/applications/port/in-bound/report.service.port';
import { JwtExceptionFilter } from 'src/filters/jwt-exception.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestSaveReportDto } from './dtos/requests/request-save-report.dto';
import { User } from 'src/decorators/user.decorator';
import { ResponseSaveReport } from './dtos/responses/response-save-report.dto';

@ApiTags('reports')
@Controller('reports')
@ApiBearerAuth()
export class ReportController {
  constructor(private readonly reportServicePort: ReportServicePort) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtExceptionFilter)
  @ApiOperation({
    summary: '신고 생성 api',
    description: '신고 생성 api',
  })
  @ApiResponse({
    status: 201,
    description: '성공',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: '신고 완료' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '실패(잘못된 요청)',
  })
  @ApiResponse({
    status: 500,
    description: '서버 오류',
  })
  async save(
    @User() user_id: number,
    @Body() dto: RequestSaveReportDto,
  ): Promise<ResponseSaveReport> {
    return await this.reportServicePort.save(user_id, dto);
  }
}
