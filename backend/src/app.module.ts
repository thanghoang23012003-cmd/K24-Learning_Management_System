import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { CustomI18nValidationExceptionFilter } from './guard/custom-i18n-validation-exception-filter.guard';
import { join } from 'path';
import { CourseModule } from './courses/course.module';
import { InstructorModule } from './instructors/instructor.module';
import { ReviewModule } from './reviews/review.module';
import { CartModule } from './cart/cart.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }],
    }),
    HealthModule,
    AuthModule,
    CourseModule,
    InstructorModule,
    ReviewModule,
    CartModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // client truy cập http://localhost:3000/uploads/filename.jpg
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CustomI18nValidationExceptionFilter],
})
export class AppModule {}
