import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ProfileDto } from './dto/profile.dto';
import { FileUploadInterceptor } from '../interceptors/file-upload.interceptor';
import { UserSerializer } from './user.serialize';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findByField('_id', req.user._id);
    return UserSerializer.fromUser(user);
  }

  // @UseInterceptors(AnyFilesInterceptor())
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileUploadInterceptor({ fieldName: 'avatar' }))
  @Patch('profile')
  async updateProfile(
    @Request() req,
    @Body() body: ProfileDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    body.avatar = avatar ? avatar.path : undefined;
    const user = await this.usersService.update(req.user._id, body);

    return UserSerializer.fromUser(user);
  }
}
