import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByUsername(username: string): Promise<UserDocument > {
    return this.userModel.findOne({ username }).exec();
  }

  async create(username: string, password: string, email: string, firstName: string, lastName: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword, email, firstName, lastName });
    return newUser.save();
  }

  async findByField(field: string, value: any) {
    return this.userModel.findOne({ [field]: value }).exec();
  }
}
