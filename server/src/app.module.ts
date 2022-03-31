import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {JwtModule} from "@nestjs/jwt";
import {QuestionsController} from "./questions/questions.controller";
import {Question} from "./questions/questions.model";
import {Answer} from "./answers/answers.model";
import {AnswersController} from "./answers/answers.controller";


@Module({
    imports: [
        UsersModule,
        QuestionsModule,
        AnswersModule,
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASS,
            database: process.env.POSTGRES_DB,
            models: [User, Question, Answer],
            autoLoadModels: true
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '12h' },
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(QuestionsController, AnswersController, 'users/jwttest')
    }
}
