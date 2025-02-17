import { RequestSaveReportDto } from 'src/applications/adapter/in-bound/dtos/requests/request-save-report.dto';
import { ResponseSaveReport } from 'src/applications/use-case/dtos/responses/response-save-report.dto';

export abstract class ReportServicePort {
  save: (
    user_id: number,
    dto: RequestSaveReportDto,
  ) => Promise<ResponseSaveReport>;
}
