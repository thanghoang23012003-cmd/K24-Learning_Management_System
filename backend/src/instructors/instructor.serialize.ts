// user serializer
import { InstructorDocument } from './instructor.schema';

export class InstructorSerializer {
  private static PERMIT = [
    '_id',
    'name',
    'bio',
    'position',
    'avgRating',
    'totalReviews',
  ];
  private static CONVERT_STRING = ['_id'];

  static fromInstructor(instructor: InstructorDocument) {
    return this.PERMIT.reduce((obj, key) => {
      if (this.CONVERT_STRING.includes(key)) {
        obj[key] = String(instructor[key]);
      } else if (instructor[key] !== undefined) {
        obj[key] = instructor[key];
      }
      return obj;
    }, {});
  }
}
