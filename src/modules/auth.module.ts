import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/applications/adapter/in-bound/auth.controller';
import { AuthServicePort } from 'src/applications/port/in-bound/auth.service.port';
import { AuthService } from 'src/applications/use-case/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 환경 변수에서 비밀 키 가져오기
      signOptions: { expiresIn: '1h' }, // 기본 만료 시간 설정 (Access Token)
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthServicePort,
      useClass: AuthService,
    },
  ],
  exports: [],
})
export class AuthModule {}
