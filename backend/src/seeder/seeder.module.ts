import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSeederService } from './course/course.seeder.service';
import { Course, CourseSchema } from '../courses/course.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Instructor, InstructorSchema } from '../instructors/instructor.schema';
import { InstructorSeederService } from './instructor/instructor.seeder.service';
import { UserSeederService } from './user/user.seeder.service';
import { User, UserSchema } from '../users/users.schema';
import { Review, ReviewSchema } from '../reviews/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Instructor.name, schema: InstructorSchema },
      { name: User.name, schema: UserSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CourseSeederService, InstructorSeederService, UserSeederService],
  exports: [CourseSeederService, InstructorSeederService, UserSeederService],
})
export class SeederModule {}
