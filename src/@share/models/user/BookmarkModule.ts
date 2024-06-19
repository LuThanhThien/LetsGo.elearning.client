import { AuditData } from "../global/AuditData";


export type BookmarkModuleModel = {
    id: number,
    username: string,
    moduleId: number,
    boolmarkModuleStatus: BookmarkModuleStatus,
} & AuditData;

export enum BookmarkModuleStatus {
    SAVED = "Đã lưu",
    UNSAVED = "Chưa lưu",
}