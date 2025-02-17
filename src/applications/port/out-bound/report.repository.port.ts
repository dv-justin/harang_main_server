import { ReportSaveInterface } from 'src/applications/adapter/out-bound/interfaces/report-save.interface';

export abstract class ReportRepositoryPort {
  save: (report: ReportSaveInterface) => Promise<void>;
}
