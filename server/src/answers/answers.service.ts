import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Answer} from "./answers.model";
import {CreateAnswerDto} from "./dto/create-answer.dto";

@Injectable()
export class AnswersService {
    constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

    async createAnswer(dto: CreateAnswerDto) {
        let answer = await this.answerRepository.create(dto)
        return answer
    }

    async getAnswersByQuestion(qId) {
        let answers = await this.answerRepository.findAll({where: {questionId: parseInt(qId)}})
        return answers
    }
}
