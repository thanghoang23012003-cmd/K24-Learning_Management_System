import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstructorDocument = Instructor & Document;

@Schema()
export class Instructor {
  @Prop({ required: true })
  name: string;

  @Prop()
  bio: string;

  @Prop()
  position: string;

  @Prop({ default: 5 })
  avgRating: number;

  @Prop({ default: 0 })
  totalReviews: number;
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
