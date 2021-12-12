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

  @Get()
  @Roles('ADMIN', 'USER')
  async findForUser(
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Query('perPage', new DefaultValuePipe(1000)) perPage: number
  ) {
    const currentUser = await this.userService.currentUser();
    console.log(currentUser);
    const result = await this.sessionRepo.findForUser(currentUser._id, { page, perPage });
    return result;
  }

  @Get('/:id')
  @Roles('ADMIN', 'USER')
  async findOne(@Param('id') id: string) {
    const session = await this.sessionRepo.findOne(id)
    return session
  }

  @Delete('/:id')
  @Roles('ADMIN', 'USER')
  async remove(@Param('id') id: string) {
    const result = this.sessionRepo.remove(id)
    return result
  }

}
