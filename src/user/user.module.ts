import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UserRepo } from './user.repo';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserRepo,
    UserService,
  ],
  exports: [
    UserRepo,
    UserService,
  ]
})
export class UserModule {}
