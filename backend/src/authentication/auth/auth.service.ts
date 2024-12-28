import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

// import * as bcrypt from "bcrypt";
import * as argon2 from 'argon2';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { GoogleOAuthPayload } from 'src/interfaces/googleOAuthPayload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  // Authenticates email and Password
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // Added feature for Google Authenticated users (no password)
    if (!user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const result = await argon2.verify(user.password, password);
    if (!result) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: userPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  // Returns JWT Bearer Token
  async login(user: User) {
    const profile = await this.db.profile.findUnique({
      where: { userId: user.id },
    });
    const payload = {
      email: user.email,
      sub: user.id,
      name: profile.name,
      image: profile.image,
    };
    return {
      // Calls Passport JWTStrategy
      email: user.email,
      id: user.id,
      image: profile.image,
      name: profile.name,
      access_token: this.jwtService.sign(payload, {
        issuer: 'Tailchro',
        audience: process.env.BACKEND_URL,
      }),
    };
  }
  async createUsername(username: string) {
    const parsedUsername = username.split(' ').join('').toLowerCase();
    const user = await this.db.user.findUnique({
      where: { username: parsedUsername },
    });
    if (user) {
      return this.createUsername(
        `${parsedUsername}${Math.floor(Math.random() * 1000)}`,
      );
    }
    return parsedUsername;
  }
  async googleAuthentication(payload: GoogleOAuthPayload) {
    const user = await this.db.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      const newUser = await this.userService.createVerified(
        {
          email: payload.email,
          username: await this.createUsername(
            `${payload.firstName}${payload.lastName}`.trim(),
          ),
          name: `${payload.firstName} ${payload.lastName}`,
          password: null,
          image: payload.picture,
        },
        null,
      );
      return this.login(newUser);
    }
    if (!user.emailVerified) {
      await this.userService.setUserVerified(user.id);
    }
    return this.login(user);
  }
}
