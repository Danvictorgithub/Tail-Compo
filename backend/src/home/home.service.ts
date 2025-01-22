import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class HomeService {
  constructor(private db: PrismaService) {}
  async getTrendingUsers() {
    const topUsers = await this.db.user.findMany({
      take: 8,
      select: {
        username: true,
        profile: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    });
    return topUsers;
  }
}
