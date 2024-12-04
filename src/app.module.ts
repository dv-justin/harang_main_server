import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1-harang.c9o4eyoiwaus.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'KOIGBfCEtzVrf7MSzIJR',
      database: 'harang',
      entities: [__dirname + '/applications/domain/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
