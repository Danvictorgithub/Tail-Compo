import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '../jwt/jwt.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { S3Service } from 'src/microservices/s3/s3.service';

@Module({
  imports: [UsersModule, PrismaModule, PassportModule, PrismaModule, JwtModule.register({
    secret: process.env.JWT_SECRET || "thequickbrownfox",
    signOptions: { expiresIn: "7d" }
  })],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy, JwtService, ProfilesService, S3Service],
  controllers: [AuthController],
})
export class AuthModule { }
