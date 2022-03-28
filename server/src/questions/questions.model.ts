import {Column, DataType, Model, Table} from "sequelize-typescript";

interface QuestionsCreationAttrs {
    title: string;
    description: string;
    tags: [string];
    creatorId: number;
    creatorUserName: string;
}

@Table({tableName: 'questions'})
export class Question extends Model<Question, QuestionsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
    tags: [string];

    @Column({type: DataType.INTEGER, defaultValue: 0})
    views: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    creatorId: number;

    @Column({type: DataType.STRING, allowNull: false})
    creatorUserName: string;
}