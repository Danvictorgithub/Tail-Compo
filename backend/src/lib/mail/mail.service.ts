import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    private logo: string
    constructor(private mailerServer: MailerService) {
        this.logo = `${process.env.BACKEND_URL}/public/tailchro.png`
    }
    async sendEmailConfirmation(userEmail: string, confirmationUrl) {
        this.mailerServer.sendMail({
            to: userEmail,
            from: "tailchromailer",
            subject: "Tailchro Email Confirmation",
            template: 'emailConfirmation.ejs',
            context: {
                logo: this.logo,
                frontend_url: process.env.FRONTEND_URL,
                confirmation_url: confirmationUrl
            }
        })
        return { message: "Email Sent Successfuly" }
    }
    async sendPasswordReset(userEmail: string, passwordResetUrl) {
        this.mailerServer.sendMail({
            to: userEmail,
            from: "tailchromailer",
            subject: "Tailchro Password Reset",
            template: 'passwordReset.ejs',
            context: {
                logo: this.logo,
                frontend_url: process.env.FRONTEND_URL,
                password_reset_url: passwordResetUrl
            }
        })
        return { message: "Email Sent Successfuly" }
    }
}
