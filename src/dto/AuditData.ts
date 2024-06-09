import { UserDto } from "./User";


export type AuditData = {
    createdDatetime: Date,
    createdBy: UserDto,
    lastModifiedDatetime: Date,
    lastModifiedBy: UserDto,
}