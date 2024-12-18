import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TieModule } from './modules/tie.module';
import { HomeModule } from './modules/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
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
    AuthModule,
    TieModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
