import { AuditData } from "./AuditData";
import { PaymentDto } from "./Payment";
import { UserDto } from "./User";


export type EnrollmentDto = {
    id: number,
    user: number,
    enrolledDatetime: Date,
    enrollmentStatus: EnrollmentStatus,
    payment: number,
    completedDatetime: Date,
    enrollmentModules: number,
} & AuditData;


export type EnrollmentModuleDto = {
    id: number,
    enrollment: number,
    module: number,
    paid: boolean,
    enrollmentPrice: number,
} & AuditData;

export enum EnrollmentStatus {
    CANCELED = "Hủy tham gia",
    ENROLLED = "Đã tham gia",
    COMPLETED = "Hoàn tất",
}