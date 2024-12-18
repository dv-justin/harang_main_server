import { Module } from '@nestjs/common';
import { HomeController } from 'src/applications/adapter/in-bound/home.controller';

@Module({
  imports: [],
  controllers: [HomeController],
  providers: [],
  exports: [],
})
export class HomeModule {}
