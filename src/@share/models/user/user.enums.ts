import { EnumStyle } from "../../lib/style";

export enum Gender {
    MALE = "Nam",
    FEMALE = "Nữ",
    OTHER = "Khác",
}

export const GenderStyles : Record<Gender, EnumStyle> = {
    [Gender.FEMALE]: { color: "primary" },
    [Gender.MALE]: { color: "info" },
    [Gender.OTHER]: { color: "warning" },
}

