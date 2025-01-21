import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [PrismaModule],
})
export class HomeModule {}
