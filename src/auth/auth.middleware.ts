import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import getTokenFromRequest from './getTokenFromRequest';

declare module "express" {
  interface Request {
    user?: any;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor (private authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromRequest(req);
    this.authService.verifyUser(token)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }  

}
