import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.interface';
import { LoginUserDto } from './dto/login-user.dto'
import { NewUserDto } from './dto/new-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly userService: UserService, private readonly jwtService: JwtService ) {}

    async newUser(newUserDto: NewUserDto): Promise<User> {
        const { username, userId, password, name } = newUserDto;

        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltOrRounds)

        const userInDb = await this.userModel.findOne({username: username})
        console.log('userDb', userInDb);
        

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }

        const createdUser = new this.userModel({userId, name, username, password: passwordHash})
        return createdUser.save()
    }

    async login({ username, password }: LoginUserDto) {
        const user = await this.userService.findOne(username);    
        
        const isMatch = await bcrypt.compare(password, user.password)

        if (user && isMatch) {
            const token = this._createToken(user);
            return {
                accessToken: token
            }
        } else {
            throw new Error('Username or Password incorrect')
        }
    }

    private _createToken({ userId }: User): any {
        const user: JwtPayload = { userId };    
        const accessToken = this.jwtService.sign(user);    
        return accessToken
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        const user_ = await this.userService.findByPayload(payload);    
        if (!user_) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }
        const {name, username, userId} = user_
        const user = {name, userId, username}
        return user;  
    }
}