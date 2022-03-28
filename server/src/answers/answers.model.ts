import {Column, DataType, Model, Table} from "sequelize-typescript";

interface AnswersCreationAttrs {
    text: string;
    questionId: number;
    creatorId: number;
    creatorUserName: string;
}

@Table({tableName: 'answers'})
export class Answer extends Model<Answer, AnswersCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    questionId: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    creatorId: number;

    @Column({type: DataType.STRING, allowNull: false})
    creatorUserName: string;
}