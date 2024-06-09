import { AuditData } from "./AuditData"


export type PaymentDto = {
    id: number,
    amount: number,
    paymentStatus: PaymentStatus,
    paymentMethod: PaymentMethod,
    user: number,
    enrollment: number,
    modules: number[],
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

