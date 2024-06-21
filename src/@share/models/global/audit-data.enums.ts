import { EnumStyle } from "@/@share/lib/style";


export enum DataStatus {
    ACTIVE = "Hoạt động",
    INACTIVE = "Vô hiệu hóa",
}

export const DataStatusStyles : Record<DataStatus, EnumStyle> = {
    [DataStatus.ACTIVE]: { color: "success" },
    [DataStatus.INACTIVE]: { color: "error" },
}