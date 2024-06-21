import { EnumStyle } from "../../lib/style";


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