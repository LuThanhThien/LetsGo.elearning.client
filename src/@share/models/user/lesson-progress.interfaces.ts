import { AuditData } from "../global/audit-data.interfaces";


export interface LessonProgressModel extends AuditData {
    id: number,
    username: string,
    lessonId: number,
    completedDatatime: Date,
}

