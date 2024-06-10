import { AssetModel } from "./Asset";
import { ChoiceType } from "./Choice";

export type QuestionModel = {
    id: number,
    content: string,
    mediaListId: number[],
    assignmentId: number,
    dtype: string,
} & AssetModel;


export type ChoieQuestionModel = {
    choicesId: number[],
    choiceType: ChoiceType,
} & QuestionModel;


export type TextQuestionModel = {
    maxLength: number,
} & QuestionModel;