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
import { RuleDataDTO } from './rule.dto';
import { RuleRepo } from './rule.repo';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller({
  version: '1',
  path: 'api/rule'
})
@UseGuards(RolesGuard)
export class RuleController {

  constructor (private ruleRepo: RuleRepo) {}

  @Post()
  @Roles('ADMIN')
  async create(@Body() payload: RuleDataDTO) {
    const result = await this.ruleRepo.save(payload);
    return result;
  }

  @Delete('/:predicate')
  @Roles('ADMIN')
  async remove(@Param('predicate') predicate: string) {
    const result = await this.ruleRepo.remove(predicate);
    if (!result) {
      throw new HttpException(`rule with predicate #${predicate} can't be found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get() 
  @Roles('ADMIN', 'USER')
  async find(
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Query('perPage', new DefaultValuePipe(10)) perPage: number) {
      const result = await this.ruleRepo.find({ page, perPage });
      return result;
  }

  @Get('/count')
  @Roles('ADMIN', 'USER')
  async count() {
    const count = await this.ruleRepo.estimatedCount()
    return {
      count
    }
  }
}