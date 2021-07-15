import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    UserModule
  ],
  providers: [
    AuthService,
    RolesGuard,
  ],
  exports: [
    AuthService,
    RolesGuard,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
