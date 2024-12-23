import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MulterConfigModuleModule } from './configs/multer-config-module/multer-config-module.module';
import { S3Module } from './microservices/s3/s3.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    UsersModule, AuthModule, ProfilesModule,
    MulterConfigModuleModule, S3Module, EventEmitterModule.forRoot(),
    MailerModule.forRoot({
      transport: (process.env.PRODUCTION != 'true') ? 'smtp://127.0.0.1:1025' : {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
