import { DataStatus } from "../../lib/avatar";

export type OTPEntryModel = {
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