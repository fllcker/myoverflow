import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Question} from "./questions.model";

@Module({
    controllers: [QuestionsController],
    providers: [QuestionsService],
    imports: [
        SequelizeModule.forFeature([Question])
    ]
})
export class QuestionsModule {}
