import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { CourseSeederService } from './course/course.seeder.service';
import { InstructorSeederService } from './instructor/instructor.seeder.service';
import { UserSeederService } from './user/user.seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  const userSeeder = app.get(UserSeederService);
  await userSeeder.run();

  const courseSeeder = app.get(CourseSeederService);
  await courseSeeder.run();

  const instructorSeeder = app.get(InstructorSeederService);
  await instructorSeeder.run();

  await app.close();
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
