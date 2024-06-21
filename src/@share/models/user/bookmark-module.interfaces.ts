import { AuditData } from "../global/audit-data.interfaces";
import { BookmarkModuleStatus } from "./bookmark-module.enums";


export interface BookmarkModuleModel extends AuditData {
    id: number,
    username: string,
    moduleId: number,
    boolmarkModuleStatus: BookmarkModuleStatus,
} 
