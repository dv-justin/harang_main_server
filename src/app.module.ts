import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TieModule } from './modules/tie.module';
import { HomeModule } from './modules/home.module';
import { StorageModule } from './modules/storage.module';
import { ReportModule } from './modules/report.module';
import { NotificationModule } from './modules/notification.module';

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
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/applications/domain/**/*.entity.{js,ts}'],
        synchronize: false,
        keepConnectionAlive: true,
      }),
    }),
    UserModule,
    AuthModule,
    TieModule,
    HomeModule,
    StorageModule,
    ReportModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
