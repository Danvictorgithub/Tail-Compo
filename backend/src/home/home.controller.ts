import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get('trending-users')
  getTrendingUsers() {
    return this.homeService.getTrendingUsers();
  }
}
