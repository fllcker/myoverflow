import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Question} from "./questions.model";
import {NewQuestionDto} from "./dto/new-question.dto";

@Injectable()
export class QuestionsService {
    constructor(@InjectModel(Question) private questionRepository: typeof Question) {}

    async createQuestion(dto: NewQuestionDto) {
        const question = await this.questionRepository.create(dto)
        return question
    }

    async getAllQuestions() {
        const questions = await this.questionRepository.findAll()
        return questions
    }

    async getQuestionById(qId) {
        const question = await this.questionRepository.findOne({where: {id: qId}})
        return question
    }

    async getQuestionByUserId(qId) {
        const question = await this.questionRepository.findOne({where: {creatorId: qId}})
        return question
    }
}
