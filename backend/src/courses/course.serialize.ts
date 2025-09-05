// user serializer 
import { CourseDocument } from './course.schema';

export class CourseSerializer {
    private static PERMIT = ['_id', 'title', 'description', 'avgRating', 'totalRating', 'totalChapter', 'totalCertificate', 'totalFavorite', 'totalHour', 'totalOrder', 'price', 'createdAt'];
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