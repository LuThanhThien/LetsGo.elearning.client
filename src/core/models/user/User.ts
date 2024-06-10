import { Role } from "../auth/Auth";
import { DataStatus } from "../../models/global/AuditData";
import { EnumStyle } from "../../lib/style";

export type UserModel = {
    id: number,
    fullName: string,
    username: string,
    password: string,
    birthDate: Date,
    gender: Gender,
    phone: string,
    location: string,
    school: string,
    avatar: string,
    role: Role,
    authorities: string[],
    numberEnrollmentModules: number,
    enrollmentsId: number[],
    paymentsId: number[],
    bookmarkModulesId: number[],
    assignmentAttemptsId: number[],
    dataStatus?: DataStatus,
    createdDatetime: Date,
    lastLoginDatetime: Date,
    lastChangePasswordDatetime: Date,
}

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

