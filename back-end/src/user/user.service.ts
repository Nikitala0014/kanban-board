import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({username: username})
    }

    async findByPayload({ userId }: any): Promise<User> {
        return await this.userModel.findOne({userId: userId});  
    }
}