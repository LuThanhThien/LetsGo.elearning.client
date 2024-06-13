import { AuditData } from "../global/AuditData";


export type ChoiceModel = {
    id: number,
    content: string,
    isCorrect: boolean,
} & AuditData;

export enum ChoiceType {
    MultipleChoice = "MultipleChoice",
    MultipleSelection = "MultipleSelection",
}

