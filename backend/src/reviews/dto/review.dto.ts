import { IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReviewDto {
    @IsString()
    content: string;

    @IsNumber()
    rating: number;
}
