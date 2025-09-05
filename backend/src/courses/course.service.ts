import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async getListCourse(): Promise<CourseDocument[]> {
    return this.courseModel.find().sort({ createdAt: -1 }).exec();
  }

  async getTrendingCourses(limit: number): Promise<CourseDocument[]> {
    return this.courseModel.find({ avgRating: { $gt: 4.5 } }).sort({ avgRating: -1 }).limit(limit).exec();
  }

  async findByField(field: string, value: any) {
    return this.courseModel.findOne({ [field]: value }).exec();
  }
}
