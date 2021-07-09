import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rule, RuleSchema } from './rule.model';
import { RuleService } from './rule.service';
import { RuleRepo } from './rule.repo';
import { RuleController } from './rule.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rule.name, schema: RuleSchema }
    ])
  ],
  controllers: [
    RuleController,
  ],
  providers: [
    RuleService,
    RuleRepo,
  ]
})
export class RuleModule {

}