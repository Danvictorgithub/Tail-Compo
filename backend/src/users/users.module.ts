import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { ProfilesService } from 'src/profiles/profiles.service';
import { S3Module } from 'src/microservices/s3/s3.module';
import { UserCreatedService } from './events/user-created/user-created.service';
import { UserResetPasswordService } from './events/user-reset-password/user-reset-password.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ProfilesService, UserCreatedService, UserResetPasswordService],
  imports: [PrismaModule, S3Module]
})
export class UsersModule { }
