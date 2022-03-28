import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService
    ) {}

    use(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1]
            try {
                let verify = this.jwtService.verify(token)
                res.cookie('user', verify)
                //req.user = verify
                next()
            } catch (e) {
                res.redirect('')
            }
        } else res.redirect('')
    }
}