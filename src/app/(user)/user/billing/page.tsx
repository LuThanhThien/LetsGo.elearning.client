"use client";
import Loading from "@/app/loading";
import { useUser } from "../../../../@core/context/UserContext";
import { EnumStyle, FontSize, Styles } from "../../../../@core/lib/style";
import { Card, CardContent, FormLabel, Grid, Typography, TypographyProps } from "@mui/material";
import { BadgeCheck, BadgeInfo, BadgeX, CreditCard, ReceiptText } from "lucide-react";
import {
  DefaultButton,
  DefaultTablePagination,
  DefaultTableCell, 
  DefaultTableRow,
  DefaultChip,
} from "../../../../@core/index.ui";
import { doFormatCurrency, doFormatDate, doFormatTime, getEnumValue } from "../../../../@core/lib/utils";
import { PaymentMethod, PaymentStatus } from "../../../../@core/index.models";
import { MuiColor } from "../../../../@core/ui/display/MuiColor";
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
      <Typography fontSize={fontSize ? fontSize : FontSize.small} fontWeight={fontWeight ? fontWeight : "bold"} paddingBottom={paddingBottom ? paddingBottom : 0.5} paddingLeft={paddingLeft ? paddingLeft : 0.4} {...props}>{label}</Typography>
    </FormLabel>
  )
}


export default function BillingPage() {
  const topButtonProps = {
      noPadding: true,
      variant: "contained",
      typographyProps: {
        fontSize: FontSize.small,
        paddingTop: 0.5,
        paddingBottom: 0.5,
      }
  }
  const { 
    session,
    contextStatus,
    payments
  } = useUser();
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalPending, setTotalPending] = useState<number>(0);
  
  useEffect(() => {
    if (payments?.length > 0) {
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
            <Typography fontSize={FontSize.super} fontWeight={"bold"} paddingLeft={1}>Lịch sử thanh toán</Typography>
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
                    <Grid container direction={"row"} spacing={7} justifyContent={"flex-start"}>
                      <Grid item>
                        <Typography variant="caption">Đã thanh toán</Typography>
                        <Typography fontSize={FontSize.extra} fontWeight={"bold"}>{doFormatCurrency(totalPayment)}</Typography>
                      </Grid>
                      <Grid item >
                      <Typography variant="caption">Chờ thanh toán</Typography>
                        <Typography fontSize={FontSize.extra} fontWeight={"bold"}>{doFormatCurrency(totalPending)}</Typography>
                      </Grid>
                      <Grid item>
                      <Typography variant="caption">Tổng số học phần</Typography>
                        <Typography fontSize={FontSize.extra} fontWeight={"bold"}>{session.user?.numberEnrollmentModules}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} alignItems={"flex-start"}>
                    <Grid container direction={"row"} spacing={2} justifyContent={"flex-end"} alignItems={"flex-start"}>
                      <Grid item>
                        <DefaultButton {...topButtonProps} variant="outlined" color="warning" startIcon={<ReceiptText/>}>Hoá đơn điện tử</DefaultButton>
                      </Grid>
                      <Grid item>
                        <DefaultButton {...topButtonProps} variant="outlined" color="info" startIcon={<CreditCard/>}>Thanh toán</DefaultButton>
                      </Grid>
                    </Grid>
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
                  <Grid item xs={12}>
                    <DefaultTablePagination
                      rowsPerPageOptions={[10, 20]}
                      fullHeight
                      rows={payments}
                      renderHead={() => (
                        <DefaultTableRow>
                          <DefaultTableCell width={"20%"} align="left" sx={{paddingLeft: 3}}>Ngày tạo</DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left" sx={{paddingLeft: 3}}>Ngày thanh toán</DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left">Số tiền</DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left">Phương thức thanh toán</DefaultTableCell>
                          <DefaultTableCell align="left">Trạng thái</DefaultTableCell>
                          <DefaultTableCell align="center"></DefaultTableCell>
                        </DefaultTableRow>
                      )}
                      renderBody={(row , index) => (
                        <DefaultTableRow>
                          <DefaultTableCell width={"20%"} align="left" sx={{paddingLeft: 3}}>
                            <Typography >{doFormatDate(row.createdDatetime)}</Typography>
                            <Typography fontWeight={"bold"} variant="caption">{doFormatTime(row.createdDatetime)}</Typography>
                          </DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left" sx={{paddingLeft: 3}}>
                            {
                              row.paymentDatetime ?
                              <>
                              <Typography >{doFormatDate(row.paymentDatetime)}</Typography>
                              <Typography fontWeight={"bold"} variant="caption">{doFormatTime(row.paymentDatetime)}</Typography>
                              </>
                              : 
                              <>
                              <Typography variant="subtitle2">(Chờ thanh toán)</Typography>
                              </>
                            }
                          </DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left">
                            <Typography fontWeight={"bold"}>
                              {doFormatCurrency(row.amount)}
                            </Typography>
                          </DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left">
                            <Typography alignItems={"center"}>
                             {getEnumValue(PaymentMethod, row.paymentMethod)}
                            </Typography>
                          </DefaultTableCell>
                          <DefaultTableCell align="left">
                            <DefaultChip
                              sx={{
                                backgroundColor: PaymentStatusStyles[getEnumValue(PaymentStatus, row.paymentStatus) as PaymentStatus].color,
                              }}
                              icon={PaymentStatusStyles[getEnumValue(PaymentStatus, row.paymentStatus) as PaymentStatus].icon}
                              label={
                                <Typography variant="subtitle2">
                                  {getEnumValue(PaymentStatus, row.paymentStatus)}
                                </Typography>
                              }
                            />
                          </DefaultTableCell>
                          <DefaultTableCell align="center"></DefaultTableCell>
                        </DefaultTableRow>
                      )}
                    />
                  </Grid>
                </Grid>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
   
  )
}