import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async getListReviews(userId: string): Promise<ReviewDocument[]> {
    return this.reviewModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate('courseId', 'title')
      .populate('userId', 'firstName lastName avatar')
      .exec();
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
      .find({ courseId, parent: null })
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
    });

    const savedReview = await newReview.save();

    if (parentId) {
      await this.reviewModel.findByIdAndUpdate(parentId, {
        $push: { replies: savedReview._id },
      });
    }

    return savedReview;
  }
}
