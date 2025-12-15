import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseSerializer } from './course.serialize';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { FileUploadInterceptor } from '../interceptors/file-upload.interceptor';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('/all')
  async getListCourses(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const { data, total } = await this.courseService.getListCourse(page, limit);
    const serializedCourses = CourseSerializer.fromCourses(data);
    return { data: serializedCourses, total };
  }

  @Get('/published')
  async getListPublishedCourses() {
    const courses = await this.courseService.getListCoursePublished();
    return CourseSerializer.fromCourses(courses);
  }

  @Get('/trending')
  async getListTrendingCourses(@Query('limit') limit: number) {
    limit = limit || 8;
    const courses = await this.courseService.getTrendingCourses(limit);
    return CourseSerializer.fromCourses(courses);
  }

  @Get('/:id')
  async getCourseById(@Param('id') id: string) {
    const course = await this.courseService.findByField('_id', id);
    return CourseSerializer.serialize(course);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileUploadInterceptor({
      fieldName: ['introVideo', 'introImage'],
      allowedMimeTypes: /\/(mp4|avi|mkv|jpg|jpeg|png)$/,
      maxSizeMB: 100,
    }),
  )
  async createCourse(
    @Request() req,
    @Body() courseData: CreateCourseDto,
    @UploadedFiles()
    files: {
      introVideo?: Express.Multer.File[];
      introImage?: Express.Multer.File[];
    },
  ) {
    courseData.introVideo = files.introVideo?.[0]?.path || '';
    courseData.introImage = files.introImage?.[0]?.path || '';
    courseData.userId = req.user._id;

    const course = await this.courseService.create(courseData);
    return CourseSerializer.fromCourse(course);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteCourse(@Param('id') id: string) {
    await this.courseService.delete(id);
    return { success: true };
  }

  @Patch('/:id/unpublish')
  @UseGuards(JwtAuthGuard)
  async unpublishCourse(@Param('id') id: string) {
    const course = await this.courseService.unpublishCourse(id);
    return CourseSerializer.fromCourse(course);
  }

  @Patch('/:id/publish')
  @UseGuards(JwtAuthGuard)
  async publishCourse(@Param('id') id: string) {
    const course = await this.courseService.publishCourse(id);
    return CourseSerializer.fromCourse(course);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileUploadInterceptor({
      fieldName: ['introVideo', 'introImage'],
      allowedMimeTypes: /\/(mp4|avi|mkv|jpg|jpeg|png)$/,
      maxSizeMB: 100,
    }),
  )
  async updateCourse(
    @Param('id') id: string,
    @Body() courseData: UpdateCourseDto,
    @UploadedFiles()
    files: {
      introVideo?: Express.Multer.File[];
      introImage?: Express.Multer.File[];
    },
  ) {
    if (files.introVideo) {
      courseData.introVideo = files.introVideo[0].path;
    }

    if (files.introImage) {
      courseData.introImage = files.introImage[0].path;
    }

    const course = await this.courseService.update(id, courseData);
    return CourseSerializer.fromCourse(course);
  }
}
