// validators/is-unique.validator.ts
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../../users/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    const [property] = args.constraints; // "email" hoặc "username"
    const user = await this.usersService.findByField(property, value);
    return !user; // true nếu chưa tồn tại
  }

  defaultMessage(args: ValidationArguments) {
    const [property] = args.constraints;
    return `${property} đã tồn tại, vui lòng chọn ${property} khác`;
  }
}
