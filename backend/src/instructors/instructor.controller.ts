import { Controller, Get, Query } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorSerializer } from './instructor.serialize';

@Controller('instructors')
export class InstructorController {
  constructor(
    private instructorService: InstructorService
  ) {}

  @Get('/all')
  async getListInstructors() {
    const instructors = await this.instructorService.getListInstructors();
    return instructors.map(instructor => InstructorSerializer.fromInstructor(instructor));
  }

  @Get('/top')
  async getTopInstructors(@Query('limit') limit: number) {
    const instructors = await this.instructorService.getTopInstructors(limit || 4);
    return instructors.map(instructor => InstructorSerializer.fromInstructor(instructor));
  }
}