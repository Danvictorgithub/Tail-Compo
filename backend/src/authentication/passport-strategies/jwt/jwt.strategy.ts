import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { PrismaService } from "src/db/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(private readonly prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "thequickbrownfox",
            issuer: 'Tailchro',
            audience: process.env.BACKEND_URL
        });
    };
    async validate(payload: JwtPayload) {
        const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user) {
            this.logger.warn(`User with ID ${payload.sub} not found`);
            throw new UnauthorizedException('User not found');
        }
        const { createdAt, password, updatedAt, username, ...userObj } = user;
        return userObj;
    }
}