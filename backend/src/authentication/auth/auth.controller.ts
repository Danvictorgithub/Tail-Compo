import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  ForbiddenException,
  Body,
  ValidationPipe,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { LocalAuthGuard } from '../passport-strategies/local/local.auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../passport-strategies/jwt/jwt.auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleOAuthGuard } from '../passport-strategies/google/google.auth.guard';
import { RequestUserGoogle } from 'src/interfaces/requestUserGoogle';
import { SkipThrottle } from '@nestjs/throttler';
import { RequestUser } from 'src/interfaces/requestUser';

@SkipThrottle()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  signup(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.MulterS3.File,
  ) {
    return this.usersService.create(createUserDto, file);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req): Promise<any> {
    if (req.user) {
      return { message: 'Logout successful' };
    } else {
      throw new ForbiddenException();
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async protected(@Request() req: RequestUser): Promise<any> {
    const updatedInfo = await this.authService.getUpdatedUserInfo(req.user);
    req.user.email = updatedInfo.email;
    req.user.username = updatedInfo.username;
    req.user['name'] = updatedInfo.name;
    req.user['image'] = updatedInfo.image;
    req.user.emailVerified = updatedInfo.emailVerified;
    return req.user;
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req: RequestUserGoogle, @Response() res) {
    const token = await this.authService.googleAuthentication(req.user);
    const frontendUrl = `${process.env.FRONTEND_URL}/auth/callback?access_token=${token.access_token}`;
    return res.redirect(frontendUrl);
  }
}
