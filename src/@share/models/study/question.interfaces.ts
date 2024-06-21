import { AssetModel } from "./asset.interfaces";
import { ChoiceType } from "./choice.enums";

export interface QuestionModel extends AssetModel {
    id: number,
    content: string,
    mediaListId: number[],
    assignmentId: number,
    dtype: string,
} 

export interface ChoieQuestionModel extends QuestionModel {
    choicesId: number[],
    choiceType: ChoiceType,
}


export interface TextQuestionModel extends QuestionModel {
    maxLength: number,
} 