import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { IsUnique } from '../validators/is-unique.decorator';

export class RegisterDto {
  @IsNotEmpty({ message: 'validation.required' })
  @IsUnique('username', { message: 'validation.unique' })
  username: string;

  @IsNotEmpty({ message: 'validation.required' })
  password: string;

  @IsEmail({}, { message: 'validation.invalid' })
  @IsUnique('email', { message: 'validation.unique' })
  email: string;

  @IsNotEmpty({ message: 'validation.required' })
  firstName: string;

  @IsNotEmpty({ message: 'validation.required' })
  lastName: string;
}
