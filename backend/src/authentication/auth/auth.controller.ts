import { Controller, Post, Get, UseGuards, Request, ForbiddenException, Body, ValidationPipe, UploadedFile, ParseFilePipe, FileTypeValidator, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from '../passport-strategies/local/local.auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../passport-strategies/jwt/jwt.auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleOAuthGuard } from '../passport-strategies/google/google.auth.guard';
import { RequestUser } from 'src/interfaces/requestUser';
import { RequestUserGoogle } from 'src/interfaces/requestUserGoogle';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly usersService: UsersService) { }
    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() req): any {
        return this.authService.login(req.user);
    }

    @Post('signup')
    @UseInterceptors(FileInterceptor('file'))
    signup(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createUserDto: CreateUserDto,
        @UploadedFile(
            new ParseFilePipe({
                fileIsRequired: false,
                validators: [
                    new FileTypeValidator({ fileType: 'image/*' })]
            })
        )
        file: Express.MulterS3.File,) {
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
    async protected(@Request() req): Promise<any> {
        return req.user;
    }

    @Get("google")
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() req) {
    }

    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Request() req: RequestUserGoogle) {
        return this.authService.googleAuthentication(req.user);
    }
}
