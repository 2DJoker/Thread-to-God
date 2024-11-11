import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService, 
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, 
            secretOrKey: configService.get('JWT_SECRET')
        });

        
        console.log('JWT_SECRET:', this.configService.get('JWT_SECRET'));
    }

    async validate({ id }: { id: string }) {
        console.log('User ID from token:', id);

        const user = await this.userService.getById(id);
        
        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }
        
        return user;
    }
}
