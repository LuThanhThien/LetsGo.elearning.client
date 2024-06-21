import { AuditData } from "../global/audit-data.interfaces";



export interface ChoiceModel extends AuditData {
    id: number,
    content: string,
    isCorrect: boolean,
} 
