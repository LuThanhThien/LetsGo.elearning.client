"use client"
import Loading from "@/app/loading";
import { useUser } from "../../../../core/context/UserContext";
import { EnumStyle, FontSize, Styles } from "../../../../core/lib/style";
import { Card, CardContent, FormLabel, Grid, Typography, TypographyProps } from "@mui/material";
import { BadgeCheck, BadgeInfo, BadgeX, CreditCard, ReceiptText } from "lucide-react";
import {
  DefaultButton,
  DefaultTablePagination,
  DefaultTableCell, 
  DefaultTableRow,
  DefaultChip,
} from "../../../../core/index.ui";
import { doFormatCurrency, doFormatDate, doFormatTime, getEnumValue } from "../../../../core/lib/utils";
import { PaymentMethod, PaymentStatus } from "../../../../core/index.models";
import { MuiColor } from "@/core/ui/display/MuiColor";
import { useEffect, useState } from "react";


export const PaymentStatusStyles: Record<PaymentStatus, EnumStyle> = {
  [PaymentStatus.PENDING]: { color: MuiColor({}).info, icon: <BadgeInfo size={17}/> },
  [PaymentStatus.COMPLETED]: { color: MuiColor({}).success, icon: <BadgeCheck size={17}/> },
  [PaymentStatus.FAILED]: { color: MuiColor({}).error, icon: <BadgeX size={17}/> },
}

type InputLabelProps = {
  label: string,
} & TypographyProps;

const InputLabel = ({ label: label, paddingLeft, paddingBottom, fontWeight, fontSize, ...props } : InputLabelProps) => {
  return (
    <FormLabel>
      <Typography fontSize={fontSize ? fontSize : FontSize.small + 1} fontWeight={fontWeight ? fontWeight : "bold"} paddingBottom={paddingBottom ? paddingBottom : 0.5} paddingLeft={paddingLeft ? paddingLeft : 0.4} {...props}>{label}</Typography>
    </FormLabel>
  )
}


export default function BillingPage() {
  const topButtonProps = {
      noPadding: true,
      variant: "contained",
      typographyProps: {
        fontSize: FontSize.small + 1,
        paddingTop: 0.5,
        paddingBottom: 0.5,
      }
  }
  const { 
    contextStatus,
    payments
  } = useUser();
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalPending, setTotalPending] = useState<number>(0);
  
  useEffect(() => {
    if (payments.length > 0) {
      let totalPayment = 0;
      let totalPending = 0;
      payments.forEach(payment => {
        if (getEnumValue(PaymentStatus, payment.paymentStatus) == PaymentStatus.COMPLETED) {
          totalPayment += payment.amount;
        } else if (getEnumValue(PaymentStatus, payment.paymentStatus) == PaymentStatus.PENDING){
          totalPending += payment.amount;
        }
      });
      setTotalPayment(totalPayment);
      setTotalPending(totalPending);
    }
  }, [payments]);


  if (contextStatus === "loading") return <Loading/>;
    
  return (
    <Grid container padding={4} paddingLeft={2} rowSpacing={3}
      justifyContent={"flex-start"} alignItems={"flex-start"}
    >
      <Grid item xs={12}>
        <Grid container rowSpacing={2} direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Grid item xs={12}>
            <Typography fontSize={FontSize.super} fontWeight={"bold"} paddingLeft={1}>Khoá học đã lưu</Typography>
          </Grid>
          <Grid item xs={12}>
            <Card 
              id="billing-profile-card"
              sx={{
                ...Styles.Card,
                }}>
              <CardContent>
                <Grid container direction={"row"} alignItems={"center"}>
                  <Grid item xs={6} paddingLeft={2}>
                    Tìm kiếm
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>  
            <Card 
              id="billing-profile-card"
              sx={{
                ...Styles.Card,
                minHeight: "650px",
                }}>
              <CardContent>
                <Grid container spacing={2} justifyContent={"center"} alignItems={"flex-start"}>
                  
                </Grid>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
   
  )
}