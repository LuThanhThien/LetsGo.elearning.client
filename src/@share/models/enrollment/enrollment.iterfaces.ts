import { EnumStyle } from "../../lib/style";
import { AuditData } from "../global/audit-data.interfaces";
import { EnrollmentStatus } from "./enrollment.enums";


export interface EnrollmentModel extends AuditData {
    id: number,
    userId: number,
    enrollmentStatus: EnrollmentStatus,
    paymentId: number,
    price: number,
    enrollmentModulesId: number[],
    completedDatetime: Date,
}

