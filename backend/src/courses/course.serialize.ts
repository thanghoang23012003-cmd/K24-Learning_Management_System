// user serializer
import { CourseDocument } from './course.schema';

export class CourseSerializer {
  private static PERMIT = [
    '_id',
    'title',
    'description',
    'avgRating',
    'totalRating',
    'totalChapter',
    'userId',
    'status',
    'totalCertificate',
    'totalFavorite',
    'totalHour',
    'totalOrder',
    'price',
    'createdAt',
    'introVideo',
    'introImage',
    'showLanguage',
    'level',
    'ratingStats',
  ];
  private static CONVERT_STRING = ['_id'];

  static fromCourse(course: CourseDocument) {
    return this.PERMIT.reduce((obj, key) => {
      if (this.CONVERT_STRING.includes(key)) {
        obj[key] = String(course[key]);
      } else if (course[key] !== undefined) {
        obj[key] = course[key];
      }
      return obj;
    }, {});
  }
}
