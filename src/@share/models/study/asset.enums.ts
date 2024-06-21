import { EnumStyle } from "@/@share/lib/style";

export enum DisplayStatus {
    SHOW = "Hiển thị",
    HIDDEN = "Ẩn",
}

export const DisplayStatusStyles : Record<DisplayStatus, EnumStyle> = {
    [DisplayStatus.SHOW]: { color: "success" },
    [DisplayStatus.HIDDEN]: { color: "error" },
}
