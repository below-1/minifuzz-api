import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RuleDocument = Rule & Document;

@Schema()
export class Rule {

  @Prop({ required: true, index: true, unique: true })
  predicate: string;

  @Prop({ required: true })
  consequence: string;

  @Prop({ type: Date, default: () => new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: () => new Date() })
  updatedAt: Date;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);
