import { Body, Controller, Get, Param, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from 'src/authentication/passport-strategies/jwt/jwt.auth.guard';
import { RequestUser } from 'src/interfaces/requestUser';
import { PasswordResetDto } from './dto/password-reset.dto';

@Controller('user-email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post("emailConfirmation")
  @UseGuards(JwtAuthGuard)
  async createEmailConfirmation(@Request() req: RequestUser) {
    return this.emailService.createEmailConfirmation(req.user);
  }
  @Get("emailConfirmation/:id")
  @UseGuards(JwtAuthGuard)
  async getEmailConfirmation(@Request() req: RequestUser, @Param("id") id: string) {
    return this.emailService.getEmailConfirmation(id, req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Post("emailConfirmation/:id")
  async verifyEmailConfirmation(@Request() req: RequestUser, @Param("id") id: string) {
    return this.emailService.verifyEmailConfirmation(id, req.user);
  }

  @Post("passwordReset")
  async createPasswordReset(@Body() passwordResetDto: PasswordResetDto) {
    console.log(passwordResetDto)
    return { message: "Hello Email" }
  }
  @Get("passwordReset/:id")
  async getPasswordReset() {
    return { message: "Hello Email" }
  }
  @Post("passwordReset/:id")
  async verifyPasswordReset() {
    return { message: "Hello Email" }
  }
}
