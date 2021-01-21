import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard'
import { User } from '../schemas/user.schema';
import { NewUserDto } from './dto/new-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    newUser(@Body() newUserDto: NewUserDto): Promise<User> {
        return this.authService.newUser(newUserDto)
    }

    @Post('login')  
    public async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);  
    }

    @UseGuards(JwtAuthGuard)
    @Get('islogin')
    async isLogin() {
        return true
    }
}