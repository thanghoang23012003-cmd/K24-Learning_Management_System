export const fakeUsers = async (count: number) => {
  const { faker } = await import('@faker-js/faker');

  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      username: `user-${i + 1}`,
      email: `user-${i + 1}@example.com`,
      password: '$2b$10$jQWdjD4UYj/roYyNZGHgyOEx1U8JXC5QGitQLBMhygrZTqe2qOetq', // hashed '123456'
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      description: faker.lorem.sentences(3),
      role: 'user',
      website: faker.internet.url(),
      linkedIn: faker.internet.url(),
      youtube: faker.internet.url(),
      facebook: faker.internet.url(),
    });
  }

  return users;
};

export const fakeAdmin = async () => {
  const { faker } = await import('@faker-js/faker');

  const users = [];

  users.push({
    username: 'admin',
    email: 'admin@gmail.com',
    password: '$2b$10$jQWdjD4UYj/roYyNZGHgyOEx1U8JXC5QGitQLBMhygrZTqe2qOetq', // hashed '123456'
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    description: faker.lorem.sentences(3),
    role: 'admin',
    website: faker.internet.url(),
    linkedIn: faker.internet.url(),
    youtube: faker.internet.url(),
    facebook: faker.internet.url(),
  });

  return users;
};
