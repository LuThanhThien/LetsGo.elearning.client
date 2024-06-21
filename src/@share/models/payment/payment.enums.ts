import { EnumStyle } from "../../lib/style";
import { AuditData } from "../global/audit-data.interfaces";

export enum PaymentStatus {
    PENDING = "Đang xử lý",
    COMPLETED = "Hoàn tất",
    FAILED = "Không thành công",
}


export enum PaymentMethod {
    VNPay = "VNPay",
    MOMO = "Momo",
}

export const PaymentMethodStyles: Record<PaymentMethod, EnumStyle> = {
    [PaymentMethod.VNPay]: { color: "info" },
    [PaymentMethod.MOMO]: { color: "error" },
}

