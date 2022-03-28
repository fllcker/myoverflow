export class NewQuestionDto {
    readonly title: string;
    readonly description: string;
    readonly tags: [string];
    readonly creatorId: number;
    readonly creatorUserName: string;
}