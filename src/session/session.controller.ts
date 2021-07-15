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
import { CreateSessionDTO } from './session.dto';
import { SessionRepo } from './session.repo';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserService } from '../user/user.service';

@Controller({
  path: 'api/session',
  version: '1'
})
@UseGuards(RolesGuard)
export class SessionController {

  constructor (
    private sessionRepo: SessionRepo,
    private userService: UserService) {}

  @Post()
  @Roles('ADMIN', 'USER')
  async create(@Body() payload: CreateSessionDTO) {
    const currentUser = await this.userService.currentUser();
    const session = await this.sessionRepo.save(currentUser._id, payload);
    return session;
  }

}