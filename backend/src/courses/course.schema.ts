import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 5.0 })
  avgRating: number;

  @Prop({ default: 0 })
  totalRating: number;

  @Prop({ default: 0 })
  totalChapter: number;

  @Prop({ default: 0 })
  totalCertificate: number;

  @Prop({ default: 0 })
  totalFavorite: number;

  @Prop({ default: 0 })
  totalOrder: number;

  @Prop({ default: 0 })
  totalHour: number;

  @Prop({ default: 100 })
  price: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
