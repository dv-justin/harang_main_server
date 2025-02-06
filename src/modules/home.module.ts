import { Module } from '@nestjs/common';
import { HomeController } from 'src/applications/adapter/in-bound/home.controller';
import { TieModule } from './tie.module';
import { HomeServicePort } from 'src/applications/port/in-bound/home.service.port';
import { HomeService } from 'src/applications/use-case/home.service';
import { UserModule } from './user.module';

@Module({
  imports: [TieModule, UserModule],
  controllers: [HomeController],
  providers: [
    {
      provide: HomeServicePort,
      useClass: HomeService,
    },
  ],
  exports: [],
})
export class HomeModule {}
