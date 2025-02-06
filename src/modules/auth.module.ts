import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/applications/adapter/in-bound/auth.controller';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { AuthServicePort } from 'src/applications/port/in-bound/auth.service.port';
import { AuthService } from 'src/applications/use-case/auth.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user.module';

@Module({
  imports: [PassportModule, ConfigModule, forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: AuthServicePort,
      useClass: AuthService,
    },
  ],
  exports: [
    {
      provide: AuthServicePort,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
