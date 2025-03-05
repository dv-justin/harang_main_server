import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { ReportController } from 'src/applications/adapter/in-bound/report.controller';
import { ReportServicePort } from 'src/applications/port/in-bound/report.service.port';
import { ReportService } from 'src/applications/use-case/report.service';
import { ReportRepositoryPort } from 'src/applications/port/out-bound/repositories/report.repository.port';
import { ReportRepository } from 'src/applications/adapter/out-bound/repositories/report.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from 'src/applications/domain/entities/report.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ReportEntity])],
  controllers: [ReportController],
  providers: [
    {
      provide: ReportServicePort,
      useClass: ReportService,
    },
    {
      provide: ReportRepositoryPort,
      useClass: ReportRepository,
    },
  ],
  exports: [
    {
      provide: ReportServicePort,
      useClass: ReportService,
    },
  ],
})
export class ReportModule {}
