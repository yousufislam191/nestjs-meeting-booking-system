import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../domain/user/services/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            try {
                const decoded = this.jwtService.verify(token);
                const user = await this.userService.findById(decoded.sub);
                if (user) {
                    req['user'] = user;
                }
            } catch (error) {
                // Token validation failed
                if (error.name === 'TokenExpiredError') {
                    throw new UnauthorizedException('Expired token');
                } else if (error.name === 'JsonWebTokenError') {
                    throw new UnauthorizedException('Invalid token');
                }
            }
        }
        next();
    }
}
