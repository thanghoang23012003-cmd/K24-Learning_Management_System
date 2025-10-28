import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  level: string;

  @IsOptional()
  introVideo: string;

  @IsOptional()
  price: number;

  @IsOptional()
  totalHour: number;

  @IsOptional()
  introImage: string;

  @IsOptional()
  @IsString()
  showLanguage: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  status: string;
}
