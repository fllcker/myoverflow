import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AnswersService} from "./answers.service";
import {CreateAnswerDto} from "./dto/create-answer.dto";

@Controller('answers')
export class AnswersController {
    constructor(private answersService: AnswersService) {}

    @Get('/:id')
    getAnswersByQId(@Param('id') qId) {
        return this.answersService.getAnswersByQuestion(qId)
    }

    @Post()
    newAnswer(@Body() answerDto: CreateAnswerDto) {
        return this.answersService.createAnswer(answerDto)
    }
}
