import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from 'src/authentication/passport-strategies/jwt/jwt.auth.guard';
import { RequestUser } from 'src/interfaces/requestUser';
import { PasswordResetDto } from './dto/password-reset.dto';
import { PasswordResetVerifyDto } from './dto/password-reset-verify.dto';

@Controller('user-email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('emailConfirmation')
  @UseGuards(JwtAuthGuard)
  async createEmailConfirmation(@Request() req: RequestUser) {
    return this.emailService.createEmailConfirmation(req.user);
  }
  @Get('emailConfirmation/:id')
  async getEmailConfirmation(@Param('id') id: string) {
    return this.emailService.getEmailConfirmation(id);
  }
  @Post('emailConfirmation/:id')
  async verifyEmailConfirmation(
    @Request() req: RequestUser,
    @Param('id') id: string,
  ) {
    return this.emailService.verifyEmailConfirmation(id);
  }

  @Post('passwordReset')
  async createPasswordReset(@Body() passwordResetDto: PasswordResetDto) {
    return this.emailService.createPasswordReset(passwordResetDto);
  }

  @Get('passwordReset/:id')
  async getPasswordReset(@Param('id') id: string) {
    return this.emailService.getPasswordReset(id);
  }
  @Post('passwordReset/:id')
  async verifyPasswordReset(
    @Body() passwordResetVerifyDto: PasswordResetVerifyDto,
    @Param('id') id: string,
  ) {
    return this.emailService.verifyPasswordReset(id, passwordResetVerifyDto);
  }
}
