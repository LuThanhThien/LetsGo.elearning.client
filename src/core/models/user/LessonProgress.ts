import { AuditData } from "../global/AuditData";


export type LessonProgressModel = {
    id: number,
    username: string,
    lessonId: number,
    completedDatatime: Date,
} & AuditData;

