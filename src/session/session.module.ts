import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './session.model';
import { SessionRepo } from './session.repo';
import { SessionController } from './session.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
    ]),
    UserModule,
  ],
  providers: [
    SessionRepo,
  ],
  controllers: [
    SessionController,
  ],
})
export class SessionModule {}
