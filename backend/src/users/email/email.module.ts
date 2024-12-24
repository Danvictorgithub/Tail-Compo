import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { MailService } from 'src/lib/mail/mail.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, MailService],
  imports: [PrismaModule],
  exports: [EmailService]
})
export class EmailModule { }
