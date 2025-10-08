import { CourseDocument } from '../../courses/course.schema';
import { UserDocument } from '../../users/users.schema';

export const fakeReviews = async (
  courses: CourseDocument[],
  users: UserDocument[],
) => {
  const { faker } = await import('@faker-js/faker');

  const reviews = [];

  courses.forEach((course) => {
    for (let i = 0; i < course.totalRating; i++) {
      reviews.push({
        content: faker.lorem.sentences(3),
        rating: faker.datatype.number({ min: 3, max: 5 }),
        courseId: course._id,
        userId: faker.helpers.arrayElement(users)._id,
      });
    }
  });

  return reviews;
};
