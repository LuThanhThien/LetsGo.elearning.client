import { EnumStyle } from "@/@share/lib/style"

export enum MediaType {
    IMAGE = "Hình ảnh",
    VIDEO = "Video",
    FILE = "Tệp tin",
}

export const MediaTypeStyles : Record<MediaType, EnumStyle> = {
    [MediaType.IMAGE]: { color: "success" },
    [MediaType.VIDEO]: { color: "error" },
    [MediaType.FILE]: { color: "warning" },
}

