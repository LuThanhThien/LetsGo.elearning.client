import { AuditData } from "../global/audit-data.interfaces";
import { AttemptStatus } from "./assignment-attempt.enums";


export interface AssignmentAttemptModel extends AuditData {
    id: number,
    username: string,
    assignmentId: number,
    scoreArchive: number,
    attemptStatus: AttemptStatus,
    attemptData: AtemptData;
}

export type AtemptData = {
    choiceQuestions: { [key : number ] : number[] }
    textQuestions: { [key : number ] : string }
    attemptDuration: number,
}  
