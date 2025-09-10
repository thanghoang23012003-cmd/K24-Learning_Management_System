import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByUsernameOrEmail(keyword: string): Promise<UserDocument > {
    return this.userModel.findOne({ $or: [{ username: keyword }, { email: keyword }] }).exec();
  }

  async create(username: string, password: string, email: string, firstName: string, lastName: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword, email, firstName, lastName });
    return newUser.save();
  }

  async findByField(field: string, value: any) {
    return this.userModel.findOne({ [field]: value }).exec();
  }

  async update(userId: string, updateData: ProfileDto): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  }
}
