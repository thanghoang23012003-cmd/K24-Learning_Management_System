import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  description: string;
  
  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  linkedIn: string;
  
  @IsString()
  @IsOptional()
  youtube: string;

  @IsString()
  @IsOptional()
  facebook: string;

  @IsString()
  @IsOptional() 
  avatar: string;
}
