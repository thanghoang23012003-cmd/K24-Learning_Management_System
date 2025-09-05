import { Controller, Get, Param, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseSerializer } from './course.serialize';

@Controller('courses')
export class CourseController {
  constructor(
    private courseService: CourseService
  ) {}

  @Get('/all')
  async getListCourses() {
    const courses = await this.courseService.getListCourse();
    return courses.map(course => CourseSerializer.fromCourse(course));
  }

  @Get('/trending')
  async getListTrendingCourses(@Query('limit') limit: number) {
    limit = limit || 8;
    const courses = await this.courseService.getTrendingCourses(limit);
    return courses.map(course => CourseSerializer.fromCourse(course));
  }

  @Get('/:id')
  async getCourseById(@Param('id') id: string) {
    const course = await this.courseService.findByField('_id', id);
    return CourseSerializer.fromCourse(course);
  }
}