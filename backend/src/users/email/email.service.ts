import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { MailService } from 'src/lib/mail/mail.service';

@Injectable()
export class EmailService {
    constructor(private db: PrismaService, private mailService: MailService) { }
    async createEmailConfirmation(user: User) {
        const userDetails = await this.db.user.findUnique({ where: { id: user.id } })
        if (userDetails.emailVerified) {
            return new BadRequestException("User is already verified");
        }
        await this.db.emailToken.deleteMany({ where: { userId: user.id, type: 'VERIFY_EMAIL' } })
        const emailToken = await this.db.emailToken.create({
            data: {
                userId: user.id,
                type: 'VERIFY_EMAIL',
            }
        })
        const confirmationUrl = `${process.env.FRONTEND_URL}/email-confirmation/${emailToken.id}`
        await this.mailService.sendEmailConfirmation(user.email, confirmationUrl);
        return { message: "Email Sent Successfuly" }
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
        if (new Date().getTime() - emailToken.createdAt.getTime() > 30 * 60 * 1000) {
            throw new BadRequestException('Token Expired');
        }
        const userDetails = await this.db.user.findUnique({ where: { id: user.id } })
        if (userDetails.emailVerified) {
            return new BadRequestException("User is already verified");
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
}
