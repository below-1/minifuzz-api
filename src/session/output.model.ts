import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IOutput {
  consequence: number;
  confidence: number;
}

@Schema()
export class Output implements IOutput {
  @Prop()
  consequence: number;
  @Prop()
  confidence: number;
}

export const OutputSchema = SchemaFactory.createForClass(Output);
