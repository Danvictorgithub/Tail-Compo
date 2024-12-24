import { Injectable } from '@nestjs/common';
import { getSupabasePublicUrl } from './helpers/supabasePublicUrl';
import { MailService } from './lib/mail/mail.service';

@Injectable()
export class AppService {
  constructor(private mailService: MailService) { }
  getHello() {
    return { message: "Welcome to TailChro API v1.0.0" };
  }

  async emailTest() {
    return this.mailService.sendEmailConfirmation("danvictorprogramming1@gmail.com", "test");
  }
}
