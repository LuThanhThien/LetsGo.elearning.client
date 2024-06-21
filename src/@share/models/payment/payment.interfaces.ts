import { EnumStyle } from "../../lib/style";
import { AuditData } from "../global/audit-data.interfaces";
import { PaymentMethod, PaymentStatus } from "./payment.enums";

export interface PaymentModel extends AuditData {
    id: number,
    username: string,
    enrollmentId: number,
    modulesId: number[],
    amount: number,
    paymentStatus: PaymentStatus,
    paymentMethod: PaymentMethod,
    paymentDatetime: Date,
} 


