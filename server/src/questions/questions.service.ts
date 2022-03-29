import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Question} from "./questions.model";
import {NewQuestionDto} from "./dto/new-question.dto";
import {Op} from "sequelize";

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

    async getQuestionsContainsInTitle(keyword) {
        let questions = []

        let keywords = keyword.split(' ')
        for(let i = 0; i < keywords.length; i++) {
            let qqq = await this.questionRepository.findAll({where: {
                    title: {
                        [Op.like]: '%' + keywords[i] + '%'
                    }
                }})
            questions = [...questions, ...qqq]
        }

        return questions
    }

    async getQuestionsByTag(tag) {
        let questions = this.questionRepository.findAll({where: {
            tags: {
                [Op.contains]: [tag]
            }
            }})
        return questions
    }
}
