export const fakeInstructors = async (count: number) => {
  const { faker } = await import('@faker-js/faker');

  const instructors = [];

  for (let i = 0; i < count; i++) {
    const totalReviews = faker.datatype.number({ min: 100, max: 900 }); // số lượt rating
    const avgRating = parseFloat(
      faker.datatype.float({ min: 3, max: 5, precision: 0.1 }).toFixed(1), // điểm trung bình 3-5
    );

    instructors.push({
      name: faker.name.findName(),
      bio: faker.lorem.sentences(2),
      position: faker.name.jobTitle(),
      avgRating,
      totalReviews,
    });
  }

  return instructors;
};
