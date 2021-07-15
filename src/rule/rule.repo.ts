import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Rule, RuleDocument } from './rule.model';
import { RuleService } from './rule.service';
import { RuleDataDTO, RuleFindOptions } from './rule.dto';
import { PagingOptions,FindResult } from '../commons';

export class PredicateExistsError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'PredicateExistsError';
  }
}

@Injectable()
export class RuleRepo {
  constructor (
    @InjectModel(Rule.name) private ruleModel: Model<RuleDocument>,
    private ruleService: RuleService) {}

  public async save(payload: RuleDataDTO): Promise<Rule> {
    const isUnique = await this.ruleService.isUnique(payload.predicate);
    if (!isUnique) {
      let message = `predicate #${payload.predicate} already exists`;
      throw new PredicateExistsError(message);
    }
    let rule = new this.ruleModel();
    rule.predicate = payload.predicate;
    rule.consequence = payload.consequence;
    await rule.save();
    return rule.toObject();
    // this.ruleModel
  }

  public async remove(predicate: string): Promise<Rule> {
    const result = await this.ruleModel.findOneAndDelete({ predicate })
    return result
  }

  public async find(paging: PagingOptions) {
    const totalItems = await this.ruleModel.estimatedDocumentCount();
    let result: FindResult<Rule> = {
      perPage: -1,
      page: -1,
      totalItems,
      totalPage: -1,
      items: []
    }

    let query = this.ruleModel.find();
    const skip = paging.perPage * paging.page;
    query = query.skip(skip).limit(paging.perPage);
    result.perPage = paging.perPage;
    result.page = paging.page;
    result.totalPage = Math.ceil(totalItems / paging.perPage);
    const its = await query;
    result.items = its.map(it => it.toObject());
    return result;
  }

  public async estimatedCount() {
    const result = await this.ruleModel.estimatedDocumentCount();
    return result;
  }
}