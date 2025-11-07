import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewSerializer } from './review.serialize';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ReviewDto } from './dto/review.dto';
import { RolesGuard } from '../guard/roles.guard';

import { OptionalJwtAuthGuard } from '../guard/optional-jwt-auth.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async getAllReviews(
    @Query('status') status: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const { reviews, total } = await this.reviewService.getAllReviews(status, page, limit);
    return {
      reviews: reviews.map((review) => ReviewSerializer.fromReview(review)),
      total,
      page,
      limit,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pending')
  async getPendingReviews(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const { reviews, total } = await this.reviewService.getPendingReviews(page, limit);
    return {
      reviews: reviews.map((review) => ReviewSerializer.fromReview(review)),
      total,
      page,
      limit,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-reviews')
  async getListReviews(@Request() req) {
    const userId = req.user._id;
    const reviews = await this.reviewService.getListReviews(userId);
    return reviews.map((review) => ReviewSerializer.fromReview(review));
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('/course/:courseId')
  async getCourseReviewsForUser(
    @Param('courseId') courseId: string,
    @Request() req,
  ) {
    const userId = req.user ? req.user._id : null;
    const reviews = await this.reviewService.getCourseReviewsForUser(courseId, userId);
    return reviews.map((review) => ReviewSerializer.fromReview(review));
  }

  @Post('/course/:courseId')
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Param('courseId') courseId: string,
    @Request() req,
    @Body() body: ReviewDto,
  ) {
    const userId = req.user._id;
    const { rating, content, parentId } = body;
    const newReview = await this.reviewService.createReview(
      userId,
      courseId,
      rating,
      content,
      parentId,
    );
    return ReviewSerializer.fromReview(newReview);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/status')
  async updateReviewStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const updatedReview = await this.reviewService.updateReviewStatus(id, status);
    return ReviewSerializer.fromReview(updatedReview);
  }
}
