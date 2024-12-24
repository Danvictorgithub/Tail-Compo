import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class UserSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const userId = request.params.id;
    return user.id === userId;
  }
}
