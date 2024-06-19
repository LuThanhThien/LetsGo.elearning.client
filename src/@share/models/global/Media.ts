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

export type MediaModel = {
    id: number,
    mediaName: string,
    filePath: string,
    mediaType: string,
}