import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { RequestUser } from 'src/interfaces/requestUser';

@Injectable()
export class ProfileOwnerGuard implements CanActivate {
  constructor(private db: PrismaService) { }

  async checkProfile(user: User, id: string) {
    const profile = await this.db.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new BadRequestException("Profile not found");
    }
    return profile.userId == user.id;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const profileId = request.params.id
    return this.checkProfile(request.user, profileId);
  }
}
