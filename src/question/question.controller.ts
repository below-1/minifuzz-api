import { Controller, Get } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller({
  path: 'api/question',
  version: '1'
})
export class QuestionController {

  constructor(private questionService: QuestionService) {}

  @Get('')
  getData() {
    return this.questionService.getData();
  }

}
