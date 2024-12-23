import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MulterConfigModuleModule } from './configs/multer-config-module/multer-config-module.module';
import { S3Module } from './microservices/s3/s3.module';

@Module({
  imports: [UsersModule, AuthModule, ProfilesModule,
    MulterConfigModuleModule,
    S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
