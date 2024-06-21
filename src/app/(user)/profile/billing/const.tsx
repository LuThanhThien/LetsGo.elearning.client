import { PaymentStatus } from "@/@share/index.models";
import { MuiColor } from "@/@share/index.ui";
import { EnumStyle } from "@/@share/lib/style";
import { BadgeCheck, BadgeInfo, BadgeX } from "lucide-react";


export const PaymentStatusStyles: Record<PaymentStatus, EnumStyle> = {
    [PaymentStatus.PENDING]: { color: MuiColor({}).info, icon: <BadgeInfo size={17}/> },
    [PaymentStatus.COMPLETED]: { color: MuiColor({}).success, icon: <BadgeCheck size={17}/> },
    [PaymentStatus.FAILED]: { color: MuiColor({}).error, icon: <BadgeX size={17}/> },
  }
  