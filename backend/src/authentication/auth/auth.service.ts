import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

// import * as bcrypt from "bcrypt";
import * as argon2 from "argon2";
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }
    // Authenticates email and Password
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
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
        const payload = { email: user.email, sub: user.id };
        return {
            // Calls Passport JWTStrategy
            access_token: this.jwtService.sign(payload)
        }
    }
    async googleLogin() {

    }
}
