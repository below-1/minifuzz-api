import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document, ObjectId, Types } from 'mongoose';
import { User } from '../user/user.model';
import { IOutput, OutputSchema } from './output.model';

export type SessionDocument = Session & Document;

@Schema()
export class Session {

  @Prop({ required: true, min: 0, max: 50 })
  matchMakingPerDay: number;

  @Prop({ required: true, min: 0, max: 24 })
  increaseDuration: number;

  @Prop({ required: true, min: 0, max: 10 })
  runwayIntensity: number;

  @Prop({ required: true, min: 0, max: 10 })
  angerWhenStopped: number;

  @Prop({ required: true, min: 0, max: 10 })
  desireToReplay: number;

  @Prop({ required: true, min: 0, max: 10 })
  sideEffectAwareness: number;

  @Prop({ required: true, min: 0, max: 10 })
  procrastination: number;

  @Prop({ required: true, min: 0, max: 1000000 })
  gamingCost: number;

  @Prop({ type: [OutputSchema], required: true, min: 0, max: 7 })
  outputs: IOutput[];

  @Prop({ type: Date, required: true })
  start: Date;

  @Prop({ type: Date, required: true })
  end: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'  })
  user: User;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
