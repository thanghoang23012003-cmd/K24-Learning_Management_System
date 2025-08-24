import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('users')
export class UserController {
  constructor(
    private usersService: UsersService
  ) {}
}
