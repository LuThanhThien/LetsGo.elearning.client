import { EnumStyle } from "../../lib/style";
import { AuditData } from "../global/AuditData";


export type EnrollmentModel = {
    id: number,
    userId: number,
    enrollmentStatus: EnrollmentStatus,
    paymentId: number,
    price: number,
    enrollmentModulesId: number[],
    completedDatetime: Date,
} & AuditData;


export enum EnrollmentStatus {
    CANCELED = "Hủy tham gia",
    ENROLLED = "Đã tham gia",
    COMPLETED = "Hoàn tất",
}

export const EnrollmentStatusStyles: Record<EnrollmentStatus, EnumStyle> = {
    [EnrollmentStatus.CANCELED]: { color: "error" },
    [EnrollmentStatus.ENROLLED]: { color: "info" },
    [EnrollmentStatus.COMPLETED]: { color: "success" },
}