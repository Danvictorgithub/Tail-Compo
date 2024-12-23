import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MulterModule } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import { MulterConfigModuleModule } from './configs/multer-config-module/multer-config-module.module';
import { TestingModule } from './testing/testing.module';
import { S3Module } from './microservices/s3/s3.module';
import * as multerS3 from "multer-s3"

@Module({
  imports: [UsersModule, AuthModule, ProfilesModule,
    MulterConfigModuleModule,
    TestingModule,
    S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
