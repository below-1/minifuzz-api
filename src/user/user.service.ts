import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {

  constructor (
    @Inject(REQUEST) private request: Request,
    private userRepo: UserRepo) {}

  async currentUser() {
    const userData = this.request.user;
    const userDoc = await this.userRepo.findByUsername(userData.username);
    return userDoc;
  }  
}