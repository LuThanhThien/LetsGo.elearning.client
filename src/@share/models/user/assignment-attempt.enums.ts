import { EnumStyle } from "@/@share/lib/style";

export enum AttemptStatus {
    ONGOINF = "Chưa hoàn thành",
    COMPLETED = "Hoàn thành",
}

export const AttemptStatusStyles: Record<AttemptStatus, EnumStyle> = {
    [AttemptStatus.ONGOINF]: { color: "info" },
    [AttemptStatus.COMPLETED]: { color: "success" },
}
