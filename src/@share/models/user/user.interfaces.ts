import { EnumStyle } from "../../lib/style";
import { Role } from "../auth/auth.enums";
import { DataStatus } from "../global/audit-data.enums";
import { Gender } from "./user.enums";

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

