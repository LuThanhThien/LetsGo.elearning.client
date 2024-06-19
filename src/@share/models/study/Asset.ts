import { EnumStyle } from "@/@share/lib/style"
import { AuditData } from "../global/AuditData";

export enum DisplayStatus {
    SHOW = "Hiển thị",
    HIDDEN = "Ẩn",
}

export const DisplayStatusStyles : Record<DisplayStatus, EnumStyle> = {
    [DisplayStatus.SHOW]: { color: "success" },
    [DisplayStatus.HIDDEN]: { color: "error" },
}

export type NameStack = {
    id: number,
    name: string,
    order: number,
    stacks: NameStack[],
}


export type AssetModel = {
    displayStatus: DisplayStatus,
    name: string,
    order: number, 
    description: string,
} & AuditData;