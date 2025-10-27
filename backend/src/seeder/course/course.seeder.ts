import { UserDocument } from 'src/users/users.schema';

export const fakeCourses = async (users: UserDocument[], count: number) => {
  const { faker } = await import('@faker-js/faker');

  const topics = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Digital Marketing',
    'Graphic Design',
    'Cybersecurity',
    'Mobile Apps',
    'Business Management',
  ];

  const prefixes = [
    'Introduction to',
    'Advanced',
    'Mastering',
    'Complete Guide to',
    'Practical',
    'Fundamentals of',
  ];

  const courses = [];

  for (let i = 0; i < count; i++) {
    const avgRating = 0;
    const totalRating = 0;
    const totalChapter = faker.datatype.number({ min: 5, max: 20 });
    const totalCertificate = faker.datatype.number({ min: 50, max: 500 });
    const totalFavorite = faker.datatype.number({ min: 100, max: 1000 });
    const totalOrder = faker.datatype.number({ min: 100, max: 1000 });
    const totalHour = faker.datatype.number({ min: 10, max: 100 });
    const price = faker.datatype.number({ min: 20, max: 200, precision: 0.01 });

    courses.push({
      title: `${faker.helpers.arrayElement(prefixes)} ${faker.helpers.arrayElement(topics)}`, // trả về string có 3 từ
      description: faker.lorem.sentences(3), // trả về string có 3 câu
      status: 'public',
      level: faker.helpers.arrayElement([
        'all_level',
        'beginner',
        'intermediate',
        'advanced',
      ]),
      showLanguage: faker.helpers.arrayElement([
        'english',
        'vietnamese',
        'spanish',
      ]),
      userId: faker.helpers.arrayElement(users)._id,
      avgRating,
      totalRating,
      totalChapter,
      totalCertificate,
      totalFavorite,
      totalOrder,
      totalHour,
      price,
    });
  }

  return courses;
};
