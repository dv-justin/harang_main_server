import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from 'src/applications/domain/entities/report.entity';
import { ReportRepositoryPort } from 'src/applications/port/out-bound/repositories/report.repository.port';
import { Repository } from 'typeorm';
import { ReportSaveInterface } from '../interfaces/report-save.interface';

@Injectable()
export class ReportRepository implements ReportRepositoryPort {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
  ) {}

  async save(data: ReportSaveInterface): Promise<void> {
    await this.reportRepository.save(data);
  }
}
