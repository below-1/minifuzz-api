import {
  Controller,
  Req,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  HttpStatus,
  HttpException,
  DefaultValuePipe,
} from '@nestjs/common';
import { Request } from 'express';
import getTokenFromRequest from './getTokenFromRequest';
import { AuthService } from './auth.service';
import { SignupDTO, LoginDTO } from './auth.dto';

@Controller({
  path: 'auth'
})
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() payload: SignupDTO) {
    const user = await this.authService.signup(payload);
    return { "status": "OK" }
  }

  @Post('login')
  async login(@Body() payload: LoginDTO) {
    const token = await this.authService.login(payload);
    return token;
  }

  @Get('me')
  async me(@Req() request: Request) {
    const token = getTokenFromRequest(request);
    const user = this.authService.verifyUser(token);
    return user;
  }

}