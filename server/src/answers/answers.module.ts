import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Answer} from "./answers.model";

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [
      SequelizeModule.forFeature([Answer])
  ]
})
export class AnswersModule {}
