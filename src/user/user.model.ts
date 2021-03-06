import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, index: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: String, required: true, enum: [Role.ADMIN, Role.USER] })
  role: Role
}

export const UserSchema = SchemaFactory.createForClass(User);
