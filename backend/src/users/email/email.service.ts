import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { MailService } from 'src/lib/mail/mail.service';
import { PasswordResetDto } from './dto/password-reset.dto';
import { PasswordResetVerifyDto } from './dto/password-reset-verify.dto';
import { UsersService } from '../users.service';

@Injectable()
export class EmailService {
  constructor(
    private db: PrismaService,
    private mailService: MailService,
    private usersService: UsersService,
  ) {}
  async createEmailConfirmation(user: User) {
    if (user.emailVerified) {
      throw new BadRequestException('User is already verified');
    }
    await this.db.emailToken.deleteMany({
      where: { userId: user.id, type: 'VERIFY_EMAIL' },
    });
    const emailToken = await this.db.emailToken.create({
      data: {
        userId: user.id,
        type: 'VERIFY_EMAIL',
      },
    });
    const confirmationUrl = `${process.env.FRONTEND_URL}/email-confirmation/${emailToken.id}`;
    await this.mailService.sendEmailConfirmation(user.email, confirmationUrl);
    return { message: 'Email Sent Successfuly' };
  }
  async getEmailConfirmation(id: string) {
    const emailToken = await this.db.emailToken.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!emailToken) {
      throw new BadRequestException('Invalid Token');
    }
    if (emailToken.type !== 'VERIFY_EMAIL') {
      throw new BadRequestException('Invalid Token');
    }
    // Tokens expired after 30 minutes
    if (
      new Date().getTime() - emailToken.createdAt.getTime() >
      30 * 60 * 1000
    ) {
      throw new BadRequestException('Token Expired');
    }
    if (emailToken.user.emailVerified) {
      throw new BadRequestException('User is already verified');
    }
    return { message: 'Email Token is Valid' };
  }

  async verifyEmailConfirmation(id: string) {
    try {
      await this.getEmailConfirmation(id);
      const emailTokenInfo = await this.db.emailToken.findUnique({
        where: { id },
        include: { user: true },
      });
      await this.db.user.update({
        where: { id: emailTokenInfo.user.id },
        data: {
          emailVerified: true,
        },
      });
      await this.db.emailToken.delete({
        where: {
          id,
        },
      });
      return { message: 'Email Verified Successfully' };
    } catch {
      throw new BadRequestException('Invalid Token');
    }
  }
  async createPasswordReset(passwordResetDto: PasswordResetDto) {
    const user = await this.db.user.findUnique({
      where: { email: passwordResetDto.email },
    });
    if (!user) {
      return { message: 'Request queued' };
    }
    await this.db.emailToken.deleteMany({
      where: { userId: user.id, type: 'RESET_PASSWORD' },
    });
    const emailToken = await this.db.emailToken.create({
      data: {
        userId: user.id,
        type: 'RESET_PASSWORD',
      },
    });
    const resetUrl = `${process.env.FRONTEND_URL}/forgot-password/${emailToken.id}`;
    await this.mailService.sendPasswordReset(user.email, resetUrl);
    return { message: 'Request queued' };
  }
  async getPasswordReset(id: string) {
    const emailToken = await this.db.emailToken.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!emailToken) {
      throw new BadRequestException('Invalid Token');
    }
    if (emailToken.type !== 'RESET_PASSWORD') {
      throw new BadRequestException('Invalid Token');
    }
    // Tokens expired after 30 minutes
    if (
      new Date().getTime() - emailToken.createdAt.getTime() >
      30 * 60 * 1000
    ) {
      throw new BadRequestException('Token Expired');
    }
    return { message: 'Email Token is Valid', email: emailToken.user.email };
  }
  async verifyPasswordReset(
    id: string,
    passwordResetVerifyDto: PasswordResetVerifyDto,
  ) {
    try {
      await this.getPasswordReset(id);
      const emailTokenInfo = await this.db.emailToken.findUnique({
        where: { id },
        include: { user: true },
      });
      await this.usersService.update(
        emailTokenInfo.user.id,
        {
          password: passwordResetVerifyDto.password,
        },
        null,
        emailTokenInfo.user,
      );
      await this.db.emailToken.delete({
        where: {
          id,
        },
      });
      return { message: 'Password Reset Successfully' };
    } catch {
      throw new BadRequestException('Invalid Token');
    }
  }
}
