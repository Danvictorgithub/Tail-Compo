import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  constructor(private db: PrismaService) { }
  async checkEmailVerification(user: User) {
    if (!user.emailVerified) {
      throw new UnauthorizedException('Please verify your email address');
    }
    return true;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.checkEmailVerification(context.switchToHttp().getRequest().user);
  }
}
