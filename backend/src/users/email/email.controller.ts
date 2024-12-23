import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('user-email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {
  }

  @Get()
  async helloEmail() {
    return { message: "Hello Email" }
  }
}
