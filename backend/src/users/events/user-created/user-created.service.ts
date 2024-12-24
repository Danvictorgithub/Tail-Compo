import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { User } from '@prisma/client';
import { EmailService } from 'src/users/email/email.service';

@Injectable()
export class UserCreatedService {
    private readonly logger = new Logger(UserCreatedService.name);
    constructor(private emailService: EmailService) { }
    @OnEvent("user.created", { async: true })
    async handleUserCreatedEvent(payload: User) {
        await this.emailService.createEmailConfirmation(payload)
        this.logger.log("User created: Successfully sent email confirmation: " + payload.email)
    }

}
