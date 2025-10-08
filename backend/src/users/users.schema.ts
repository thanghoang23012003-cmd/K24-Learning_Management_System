import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Course } from '../courses/course.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  @Exclude()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  description: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  website: string;

  @Prop()
  linkedIn: string;

  @Prop()
  youtube: string;

  @Prop()
  facebook: string;

  @Prop()
  avatar: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Course' }],
    default: [],
  })
  courses: Course[];

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
