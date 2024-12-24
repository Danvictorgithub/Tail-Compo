import { Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('user-email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {
  }
  @Post("user-email/emailConfirmation")
  async createEmailConfirmation() {
    return { message: "Hello Email" }
  }
  @Get("user-email/emailConfirmation/:id")
  async getEmailConfirmation() {
    return { message: "Hello Email" }
  }
  @Post("user-email/emailConfirmation/:id")
  async verifyEmailConfirmation() {
    return { message: "Hello Email" }
  }

  @Post("user-email/passwordReset")
  async createPasswordReset() {
    return { message: "Hello Email" }
  }
  @Get("user-email/passwordReset/:id")
  async getPasswordReset() {
    return { message: "Hello Email" }
  }
  @Post("user-email/passwordReset/:id")
  async verifyPasswordReset() {
    return { message: "Hello Email" }
  }
}
