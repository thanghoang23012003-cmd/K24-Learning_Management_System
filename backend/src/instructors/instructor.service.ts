import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor, InstructorDocument } from './instructor.schema';

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel(Instructor.name)
    private instructorModel: Model<InstructorDocument>,
  ) {}

  async getListInstructors(): Promise<InstructorDocument[]> {
    return this.instructorModel.find().sort({ name: 1 }).exec();
  }

  async getTopInstructors(limit: number): Promise<InstructorDocument[]> {
    return this.instructorModel
      .find({ avgRating: { $gte: 4.5 } })
      .sort({ avgRating: -1 })
      .limit(limit)
      .exec();
  }

  async findByField(field: string, value: any) {
    return this.instructorModel.findOne({ [field]: value }).exec();
  }
}
