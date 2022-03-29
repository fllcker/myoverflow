import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {QuestionsService} from "./questions.service";
import {NewQuestionDto} from "./dto/new-question.dto";

@Controller('questions')
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {}

    @Post('/new')
    newQuestion(@Body() quesDto: NewQuestionDto) {
        return this.questionsService.createQuestion(quesDto)
    }

    @Get()
    getAllQuestions() {
        return this.questionsService.getAllQuestions()
    }

    @Get('/id/:id')
    getQuestionById(@Param('id') qId) {
        return this.questionsService.getQuestionById(parseInt(qId))
    }

    @Get('/userid/:id')
    getQuestionByUserId(@Param('id') qId) {
        return this.questionsService.getQuestionByUserId(parseInt(qId))
    }

    @Get('/contains/title/:title')
    getQuestionsContainsInTitle(@Param('title') title) {
        return this.questionsService.getQuestionsContainsInTitle(title)
    }

    @Get('/contains/tag/:tag')
    getQuestionsByTag(@Param('tag') tag) {
        return this.questionsService.getQuestionsByTag(tag)
    }
}
