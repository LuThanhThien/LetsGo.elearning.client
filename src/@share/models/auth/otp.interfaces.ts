import { DataStatus } from "../global/audit-data.enums";

export interface OTPEntryModel {
    id: number,
    username: string,
    otp: string,
    timestamp: Date,
    unitInterval: string,
    validInterval: number,
    dataStatus: DataStatus,
    isActive: boolean,
    isTimeout: boolean,
 }