import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor } from '../../instructors/instructor.schema';
import { fakeInstructors } from './instructor.seeder';

@Injectable()
export class InstructorSeederService {
  constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
  ) {}

  async run() {
    const instructors = await fakeInstructors(20); // tạo 30 giảng viên

    await this.instructorModel.collection.drop().catch(err => {
      if (err.code === 26) {
        console.log('Collection instructors không tồn tại, bỏ qua.');
      } else {
        throw err;
      }
    });

    await this.instructorModel.deleteMany({});
    await this.instructorModel.insertMany(instructors);
    console.log('Seeded instructors:', instructors);
  }
}
