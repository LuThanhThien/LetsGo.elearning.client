
export enum SettingsValueType {
    STRING = "Văn bản",
    NUMBER = "Số",
    DATE_TIME = "Ngày giờ",
    LINK = "Đường dẫn",
    IMAGE = "Hình ảnh",
    VIDEO = "Video",
    FILE = "Tập tin",
}



export type SettingsModel = {
    id: number,
    name: string,
    value: string,
    type: SettingsValueType,
}