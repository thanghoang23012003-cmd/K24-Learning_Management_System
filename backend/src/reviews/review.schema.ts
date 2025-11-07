import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Course } from '../courses/course.schema';
import { User } from '../users/users.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ required: true })
  content: string;

  @Prop({ default: null })
  rating: number;

  @Prop({ type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  courseId: Course;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Review' })
  parent: Review;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }])
  replies: Review[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
