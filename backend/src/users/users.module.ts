import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { ProfilesService } from 'src/profiles/profiles.service';
import { S3Module } from 'src/microservices/s3/s3.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ProfilesService],
  imports: [PrismaModule, S3Module]
})
export class UsersModule { }
