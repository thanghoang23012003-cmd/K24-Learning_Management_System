import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { fakeAdmin, fakeUsers } from './user.seeder';
import { User } from '../../users/users.schema';
import { Review } from 'src/reviews/review.schema';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
  ) {}

  async run() {
    const users = [...(await fakeAdmin()), ...(await fakeUsers(20))]; // tạo 20 user + 1 admin
    
    await this.reviewModel.collection.drop().catch(err => {
      if (err.code === 26) {
        console.log('Collection reviews không tồn tại, bỏ qua.');
      } else {
        throw err;
      }
    });

    await this.userModel.collection.drop().catch(err => {
      if (err.code === 26) {
        console.log('Collection users không tồn tại, bỏ qua.');
      } else {
        throw err;
      }
    });

    await this.userModel.deleteMany({});
    await this.userModel.insertMany(users);
    console.log('Seeded users:', users);
  }
}
