import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  HttpStatus,
  HttpException,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { UserRepo } from './user.repo';
import { UserService } from './user.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller({
  path: 'api/user'
})
@UseGuards(RolesGuard)
export class UserController {

  constructor (
    private userRepo: UserRepo,
    private userService: UserService) {}

  @Get()
  @Roles('ADMIN')
  async find(
    @Query('keyword', new DefaultValuePipe('')) keyword: string,
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Query('perPage', new DefaultValuePipe(10)) perPage: number
  ) {
    const result = this.userRepo.find(keyword, { page, perPage });
    return result;
  }

  @Get('/:username')
  @Roles('ADMIN', 'USER')
  async findByUsername(@Param('username') username: string) {
    const currentUser = await this.userService.currentUser();
    if (currentUser.role != 'ADMIN' || currentUser.username != username) {
      throw new HttpException("you don't have access to this user", HttpStatus.FORBIDDEN);
    }
    return currentUser;
  }
}