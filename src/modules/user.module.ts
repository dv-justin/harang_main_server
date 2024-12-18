import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/applications/adapter/in-bound/user.controller';
import { UserRepository } from 'src/applications/adapter/out-bound/user.repository';
import { UserEntity } from 'src/applications/domain/entities/user.entity';
import { UserServicePort } from 'src/applications/port/in-bound/user.service.port';
import { UserRepositoryPort } from 'src/applications/port/out-bound/user.repository.port';
import { UserService } from 'src/applications/use-case/user.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserServicePort,
      useClass: UserService,
    },
    {
      provide: UserRepositoryPort,
      useClass: UserRepository,
    },
  ],
  exports: [
    {
      provide: UserServicePort,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
