import { EnumStyle } from "@/core/lib/style"


export enum DataStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export const DataStatusStyles : Record<DataStatus, EnumStyle> = {
    [DataStatus.ACTIVE]: { color: "success" },
    [DataStatus.INACTIVE]: { color: "error" },
}


export type AuditData = {
    createdDatetime?: Date,
    createdBy?: string | null,
    lastModifiedDatetime?: Date | null,
    lastModifiedBy?: string | null,
}