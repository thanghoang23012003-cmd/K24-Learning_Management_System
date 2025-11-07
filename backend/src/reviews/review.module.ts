import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './review.schema';
import { Course, CourseSchema } from '../courses/course.schema';
import { ReviewController } from './review.controller';

import { UsersModule } from '../users/users.module';

import { RolesGuard } from '../guard/roles.guard';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Course.name, schema: CourseSchema }
    ]),
  ],
  providers: [ReviewService, RolesGuard],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
