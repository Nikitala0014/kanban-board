import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { process } from './constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [UserModule, PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user', 
      session: true 
    }), JwtModule.register({
    secret: process.secretKey,
    signOptions: { expiresIn: process.expiresIn }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule]
})
export class AuthModule {}