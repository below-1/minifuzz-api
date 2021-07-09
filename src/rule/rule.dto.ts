import { Length } from 'class-validator';
import { PagingOptions } from '../commons';

export class RuleDataDTO {

  @Length(8, 8)
  predicate: string;

  @Length(1, 1)
  consequence: string;

}

export type RuleAll = { type: 'all' };
export type RuleFindOptions = RuleAll | PagingOptions;
