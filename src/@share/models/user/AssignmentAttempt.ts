import { EnumStyle } from "@/@share/lib/style";
import { AuditData } from "../global/AuditData";


export type AssignmentAttemptModel = {
    id: number,
    username: string,
    assignmentId: number,
    scoreArchive: number,
    attemptStatus: AttemptStatus,
    attemptData: AtemptData;
} & AuditData;

export enum AttemptStatus {
    ONGOINF = "Chưa hoàn thành",
    COMPLETED = "Hoàn thành",
}

export const AttemptStatusStyles: Record<AttemptStatus, EnumStyle> = {
    [AttemptStatus.ONGOINF]: { color: "info" },
    [AttemptStatus.COMPLETED]: { color: "success" },
}

export type AtemptData = {
    choiceQuestions: { [key : number ] : number[] }
    textQuestions: { [key : number ] : string }
    attemptDuration: number,
}  
