import { EnumStyle } from "../../lib/style";
import { AuditData } from "../global/AuditData"

export type PaymentModel = {
    id: number,
    username: string,
    enrollmentId: number,
    modulesId: number[],
    amount: number,
    paymentStatus: PaymentStatus,
    paymentMethod: PaymentMethod,
    paymentDatetime: Date,
} & AuditData;


export enum PaymentStatus {
    PENDING = "Đang xử lý",
    COMPLETED = "Hoàn tất",
    FAILED = "Không thành công",
}



export enum PaymentMethod {
    CREDIT_CARD = "Thẻ tín dụng",
    BANK_TRANSFER = "Thẻ ngân hàng",
    MOMO = "Momo",
}

export const PaymentMethodStyles: Record<PaymentMethod, EnumStyle> = {
    [PaymentMethod.CREDIT_CARD]: { color: "primary" },
    [PaymentMethod.BANK_TRANSFER]: { color: "info" },
    [PaymentMethod.MOMO]: { color: "error" },
}

