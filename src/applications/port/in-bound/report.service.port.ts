import { RequestSaveReportDto } from 'src/applications/adapter/in-bound/dtos/requests/request-save-report.dto';

export abstract class ReportServicePort {
  save: (
    user_id: number,
    dto: RequestSaveReportDto,
  ) => Promise<{ message: string }>;
}
