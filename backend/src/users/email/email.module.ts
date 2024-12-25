import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { MailService } from 'src/lib/mail/mail.service';
import { MailModule } from 'src/configs/mail/mail.module';
import { UsersService } from '../users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { S3Service } from 'src/microservices/s3/s3.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, MailService, UsersService, ProfilesService, S3Service],
  imports: [PrismaModule, MailModule,],
  exports: [EmailService]
})
export class EmailModule { }
