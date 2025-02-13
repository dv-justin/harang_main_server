import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from 'src/applications/domain/entities/report.entity';
import { ReportInterface } from 'src/applications/port/out-bound/interfaces/report.interface';
import { ReportRepositoryPort } from 'src/applications/port/out-bound/report.repository.port';
import { Repository } from 'typeorm';

@Injectable()
export class ReportRepository implements ReportRepositoryPort {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
  ) {}

  async save(report: ReportInterface): Promise<void> {
    await this.reportRepository.save(report);
  }
}
