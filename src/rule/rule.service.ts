import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Rule, RuleDocument } from './rule.model';

@Injectable()
export class RuleService {

  constructor (@InjectModel(Rule.name) private ruleModel: Model<RuleDocument>) {}

  public async isUnique (predicate: string): Promise<boolean> {
    const result = await this.ruleModel.findOne({ predicate })
    return !result
  }

}