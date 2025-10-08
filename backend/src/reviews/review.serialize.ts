import { ReviewDocument } from './review.schema';

export class ReviewSerializer {
  private static PERMIT = [
    '_id',
    'content',
    'userId',
    'courseId',
    'rating',
    'createdAt',
    'updatedAt',
  ];
  private static CONVERT_STRING = ['_id'];

  static fromReview(review: ReviewDocument) {
    return this.PERMIT.reduce((obj, key) => {
      if (this.CONVERT_STRING.includes(key)) {
        obj[key] = String(review[key]);
      } else if (review[key] !== undefined) {
        obj[key] = review[key];
      }
      return obj;
    }, {});
  }
}
