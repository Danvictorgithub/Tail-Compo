import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: (process.env.PRODUCTION != 'true') ? 'smtp://127.0.0.1:1025' : { // smtp://127.0.0.1:1025, is used for mailcatcher (ruby gem)
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            },
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
            },
            template: {
                dir: __dirname + '/../../templates/',
                adapter: new EjsAdapter(),
                options: {
                    strict: false,
                },
            },
        }),
    ],
    providers: [MailService,

    ],
    exports: [MailService]
})
export class MailModule {
}
