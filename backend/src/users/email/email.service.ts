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
  async getEmailConfirmation(id: string, user: User) {
    const emailToken = await this.db.emailToken.findUnique({ where: { id } });
    if (!emailToken) {
      throw new BadRequestException('Invalid Token');
    }
    if (emailToken.userId !== user.id || emailToken.type !== 'VERIFY_EMAIL') {
      throw new BadRequestException('Invalid Token');
    }
    // Tokens expired after 30 minutes
    if (
      new Date().getTime() - emailToken.createdAt.getTime() >
      30 * 60 * 1000
    ) {
      throw new BadRequestException('Token Expired');
    }
    if (user.emailVerified) {
      throw new BadRequestException('User is already verified');
    }
    return { message: 'Email Token is Valid' };
  }

  async verifyEmailConfirmation(id: string, user: User) {
    try {
      await this.getEmailConfirmation(id, user);
      await this.db.user.update({
        where: { id: user.id },
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
    } catch (err) {
      throw new BadRequestException('Invalid Token');
    }
  }
  async createPasswordReset(passwordResetDto: PasswordResetDto) {
    const user = await this.db.user.findUnique({
      where: { email: passwordResetDto.email },
    });
    if (!user || user.emailVerified) {
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
    const resetUrl = `${process.env.FRONTEND_URL}/password-reset/${emailToken.id}`;
    await this.mailService.sendPasswordReset(user.email, resetUrl);
    return { message: 'Request queued' };
  }
  async getPasswordReset(id: string, user: User) {
    const emailToken = await this.db.emailToken.findUnique({ where: { id } });
    if (!emailToken) {
      throw new BadRequestException('Invalid Token');
    }
    if (emailToken.userId !== user.id || emailToken.type !== 'RESET_PASSWORD') {
      throw new BadRequestException('Invalid Token');
    }
    // Tokens expired after 30 minutes
    if (
      new Date().getTime() - emailToken.createdAt.getTime() >
      30 * 60 * 1000
    ) {
      throw new BadRequestException('Token Expired');
    }
    return { message: 'Email Token is Valid' };
  }
  async verifyPasswordReset(
    id: string,
    passwordResetVerifyDto: PasswordResetVerifyDto,
    user: User,
  ) {
    try {
      console.log('this is successful 0');
      await this.getPasswordReset(id, user);
      console.log('this successful');
      await this.usersService.update(user.id, {
        password: passwordResetVerifyDto.password,
      });
      console.log('this successful 2');
      await this.db.emailToken.delete({
        where: {
          id,
        },
      });
      return { message: 'Password Reset Successfully' };
    } catch (err) {
      throw new BadRequestException('Invalid Token');
    }
  }
}
