import { ReportInterface } from './interfaces/report.interface';

export abstract class ReportRepositoryPort {
  save: (report: ReportInterface) => Promise<void>;
}
