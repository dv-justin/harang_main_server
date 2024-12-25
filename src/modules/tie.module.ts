import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TieController } from 'src/applications/adapter/in-bound/tie.controller';
import { TieRepository } from 'src/applications/adapter/out-bound/tie.repository';
import { UserMatchMeetingEntity } from 'src/applications/domain/entities/user-match-meeting.entity';
import { TieServicePort } from 'src/applications/port/in-bound/tie.service.port';
import { TieRepositoryPort } from 'src/applications/port/out-bound/tie.repository.port';
import { TieService } from 'src/applications/use-case/tie.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserMatchMeetingEntity])],
  controllers: [TieController],
  providers: [
    {
      provide: TieServicePort,
      useClass: TieService,
    },
    {
      provide: TieRepositoryPort,
      useClass: TieRepository,
    },
  ],
  exports: [
    {
      provide: TieServicePort,
      useClass: TieService,
    },
  ],
})
export class TieModule {}
