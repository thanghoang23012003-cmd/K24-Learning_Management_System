import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { Course, CourseDocument } from '../courses/course.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  private async _updateCourseRatings(courseId: string) {
    const stats = await this.reviewModel.aggregate([
      {
        $match: { courseId: courseId, status: 'approved' },
        
      },
      {
        $group: {
          _id: '$courseId',
          avgRating: { $avg: '$rating' },
          totalRating: { $sum: 1 },
        },
      },
    ]);

    const course = await this.courseModel.findById(courseId);

    if (stats.length > 0) {
      course.avgRating = parseFloat(stats[0].avgRating.toFixed(1));
      course.totalRating = stats[0].totalRating;
    } else {
      course.avgRating = 0;
      course.totalRating = 0;
    }

    await course.save();
  }

  async getListReviews(userId: string): Promise<ReviewDocument[]> {
    return this.reviewModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate('courseId', 'title')
      .populate('userId', 'firstName lastName avatar')
      .exec();
  }

  async getAllReviews(status?: string, page: number = 1, limit: number = 10): Promise<{ reviews: ReviewDocument[]; total: number }> {
    console.log('Fetching reviews with status:', status);
    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const reviews = await this.reviewModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('courseId', 'title')
      .populate('userId', 'firstName lastName avatar')
      .exec();

    const total = await this.reviewModel.countDocuments(query);

    return { reviews, total };
  }

  async getPendingReviews(page: number = 1, limit: number = 10): Promise<{ reviews: ReviewDocument[]; total: number }> {
    const query = { status: 'pending' };
    const skip = (page - 1) * limit;

    const reviews = await this.reviewModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('courseId', 'title')
      .populate('userId', 'firstName lastName avatar')
      .exec();

    const total = await this.reviewModel.countDocuments(query);

    return { reviews, total };
  }

  async getCourseReviewsForUser(courseId: string, userId?: string): Promise<ReviewDocument[]> {
    console.log(`Fetching reviews for course: ${courseId}, user: ${userId}`);
    const populateOptions = {
      path: 'replies',
      populate: [
        { path: 'userId', select: 'firstName lastName avatar' },
        {
          path: 'replies',
          populate: { path: 'userId', select: 'firstName lastName avatar' },
        },
      ],
    };

    const approvedReviewsQuery = {
      courseId,
      parent: null,
      status: 'approved',
    };

    let userReviewsQuery = null;
    if (userId) {
      userReviewsQuery = {
        courseId,
        parent: null,
        userId,
        status: 'pending',
      };
    }

    const queries = [this.reviewModel.find(approvedReviewsQuery).exec()];
    if (userReviewsQuery) {
      queries.push(this.reviewModel.find(userReviewsQuery).exec());
    }

    const [approvedReviews, userReviews = []] = await Promise.all(queries);

    console.log(`Found ${approvedReviews.length} approved reviews.`);
    if (userReviews) {
      console.log(`Found ${userReviews.length} pending reviews for user.`);
    }

    const allReviews = [...approvedReviews, ...userReviews];

    // Populate all reviews
    const populatedReviews = await this.reviewModel.populate(allReviews, [
      { path: 'courseId', select: 'title' },
      { path: 'userId', select: 'firstName lastName avatar' },
      populateOptions,
    ]);

    // Sort by createdAt descending
    return populatedReviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCourseReviews(courseId: string): Promise<ReviewDocument[]> {
    const populateOptions = {
      path: 'replies',
      populate: [
        { path: 'userId', select: 'firstName lastName avatar' },
        {
          path: 'replies',
          populate: { path: 'userId', select: 'firstName lastName avatar' },
        },
      ],
    };

    return this.reviewModel
      .find({ courseId, parent: null, status: 'approved' })
      .sort({ createdAt: -1 })
      .populate('courseId', 'title')
      .populate('userId', 'firstName lastName avatar')
      .populate(populateOptions)
      .exec();
  }

  async findByField(field: string, value: any) {
    return this.reviewModel.findOne({ [field]: value }).exec();
  }

  async createReview(
    userId: string,
    courseId: string,
    rating: number,
    content: string,
    parentId?: string,
  ): Promise<ReviewDocument> {
    const newReview = new this.reviewModel({
      userId,
      courseId,
      rating,
      content,
      parent: parentId || null,
      status: 'pending',
    });

    const savedReview = await newReview.save();

    if (parentId) {
      await this.reviewModel.findByIdAndUpdate(parentId, {
        $push: { replies: savedReview._id },
      });
    }

    return savedReview.populate('userId', 'firstName lastName avatar');
  }

  async updateReviewStatus(id: string, status: string): Promise<ReviewDocument> {
    const updatedReview = await this.reviewModel.findByIdAndUpdate(id, { status }, { new: true });
    await this._updateCourseRatings(updatedReview.courseId as any);
    return updatedReview;
  }
}
