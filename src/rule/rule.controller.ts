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
} from '@nestjs/common';
import { RuleDataDTO } from './rule.dto';
import { RuleRepo } from './rule.repo';

@Controller({
  version: 1,
  path: 'api/rule'
})
export class RuleController {

  constructor (private ruleRepo: RuleRepo) {}

  @Post()
  async create(@Body() payload: RuleDataDTO) {
    const result = await this.ruleRepo.save(payload);
    return result;
  }

  @Delete('/:predicate')
  async remove(@Param('predicate') predicate: string) {
    const result = await this.ruleRepo.remove(predicate);
    if (!result) {
      throw new HttpException(`rule with predicate #${predicate} can't be found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get() 
  async find(
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Query('perPage', new DefaultValuePipe(10)) perPage: number) {
      console.log(`page = ${page}`);
      const result = await this.ruleRepo.find({ page, perPage });
      return result;
  }

  @Get('/count')
  async count() {
    const count = this.ruleRepo.estimatedCount()
    return {
      count
    }
  }
}