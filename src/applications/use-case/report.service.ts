import { Injectable } from '@nestjs/common';
import { ReportServicePort } from '../port/in-bound/report.service.port';
import { ReportRepositoryPort } from '../port/out-bound/report.repository.port';
import { RequestSaveReportDto } from '../adapter/in-bound/dtos/requests/request-save-report.dto';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { ResponseSaveReport } from './dtos/responses/response-save-report.dto';

@Injectable()
export class ReportService implements ReportServicePort {
  constructor(
    private readonly reportRepositoryPort: ReportRepositoryPort,
    private readonly userServicePort: UserServicePort,
  ) {}

  async save(
    user_id: number,
    dto: RequestSaveReportDto,
  ): Promise<ResponseSaveReport> {
    const save_report = { user_id, ...dto };

    await this.userServicePort.getUserId(dto.offender_user_id, false);

    await this.reportRepositoryPort.save(save_report);

    return { success: true };
  }
}
