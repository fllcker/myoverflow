export class CreateAnswerDto {
    readonly text: string;
    readonly questionId: number;
    readonly creatorId: number;
    readonly creatorUserName: string;
}