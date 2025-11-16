import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './course.schema';
import { Model, Types } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Review } from '../reviews/review.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
  ) {}

  private async _attachRatings(courses: CourseDocument[]): Promise<any[]> {
    if (courses.length === 0) {
      return [];
    }

    const courseIds = courses.map((c) => c._id);

    // 1. Get average ratings from approved, top-level reviews only
    const avgRatings = await this.reviewModel.aggregate([
      { $match: { courseId: { $in: courseIds }, parent: null, status: 'approved' } },
      {
        $group: {
          _id: '$courseId',
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    // 2. Get total ratings from approved reviews (reviews + replies)
    const totalRatings = await this.reviewModel.aggregate([
      { $match: { courseId: { $in: courseIds }, status: 'approved' } },
      {
        $group: {
          _id: '$courseId',
          totalRating: { $sum: 1 },
        },
      },
    ]);

    const avgRatingsMap = new Map(avgRatings.map((s) => [s._id.toString(), s]));
    const totalRatingsMap = new Map(
      totalRatings.map((s) => [s._id.toString(), s]),
    );

    return courses.map((course) => {
      const courseObj = course.toObject ? course.toObject() : course;
      const courseIdStr = course._id.toString();

      const avgStats = avgRatingsMap.get(courseIdStr);
      const totalStats = totalRatingsMap.get(courseIdStr);

      courseObj.avgRating = avgStats
        ? parseFloat((avgStats.avgRating || 0).toFixed(1))
        : 0;
      courseObj.totalRating = totalStats ? totalStats.totalRating || 0 : 0;

      return courseObj;
    });
  }

  async getListCourse(
    page: number,
    limit: number,
  ): Promise<{ data: CourseDocument[]; total: number }> {
    const total = await this.courseModel.countDocuments().exec();
    const courses = await this.courseModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const withRatings = await this._attachRatings(courses);
    return { data: withRatings, total };
  }

  async getListCoursePublished(): Promise<CourseDocument[]> {
    const courses = await this.courseModel.find({ status: 'public' }).exec();
    const withRatings = await this._attachRatings(courses);
    withRatings.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return withRatings;
  }

  async getTrendingCourses(limit: number): Promise<CourseDocument[]> {
    const courses = await this.courseModel.aggregate([
      { $match: { status: 'public' } },
      {
        $lookup: {
          from: 'reviews',
          let: { courseId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$courseId', '$$courseId'] },
                status: 'approved', // Filter for approved reviews
              },
            },
          ],
          as: 'reviews',
        },
      },
      {
        $addFields: {
          totalRating: { $size: '$reviews' },
          avgRating: {
            $ifNull: [
              // Handle courses with no reviews
              {
                $avg: {
                  $map: {
                    input: {
                      $filter: {
                        input: '$reviews',
                        as: 'review',
                        cond: { $eq: ['$$review.parent', null] },
                      },
                    },
                    as: 'review',
                    in: '$$review.rating',
                  },
                },
              },
              0, // Default avgRating if no top-level reviews
            ],
          },
        },
      },
      { $sort: { totalRating: -1, avgRating: -1 } },
      { $limit: limit },
      { $project: { reviews: 0 } } // Remove the reviews array from final output
    ]);

    // The aggregation returns plain objects, so we round the avgRating here
    courses.forEach((course) => {
      course.avgRating = parseFloat((course.avgRating || 0).toFixed(1));
    });

    return courses;
  }

  async findByField(field: string, value: any) {
    const course = await this.courseModel.findOne({ [field]: value }).lean();

    if (field === '_id' && course) {
      const coursesWithRatings = await this._attachRatings([
        course as CourseDocument,
      ]);
      const finalCourse = coursesWithRatings[0];

      // Calculate rating breakdown for the detail page chart
      const ratingStats = await this.reviewModel.aggregate([
        { $match: { courseId: new Types.ObjectId(value), parent: null, status: 'approved' } },
        {
          $group: {
            _id: '$rating',
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ]);
      finalCourse['ratingStats'] = ratingStats;

      return finalCourse;
    }

    return course;
  }

  async create(courseData: Partial<CreateCourseDto>): Promise<CourseDocument> {
    const newCourse = new this.courseModel(courseData);
    return newCourse.save();
  }

  async update(
    id: string,
    courseData: Partial<UpdateCourseDto>,
  ): Promise<CourseDocument | null> {
    return this.courseModel
      .findByIdAndUpdate(id, courseData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<CourseDocument | null> {
    return await this.courseModel.findByIdAndDelete(id).exec();
  }
}
