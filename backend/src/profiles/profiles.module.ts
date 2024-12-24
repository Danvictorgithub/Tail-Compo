import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { S3Module } from 'src/microservices/s3/s3.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [PrismaModule, S3Module]
})
export class ProfilesModule { }
