"use client"
import Loading from "@/app/loading";
import { useUser } from "@/context/UserContext";
import { Colors, FontSize, Styles } from "@/lib/styles";
import { Autocomplete, Box, Card, CardContent, Checkbox, Chip, FormControl, FormHelperText, FormLabel, Grid, Icon, InputAdornment, MenuItem, Select, Stack, TextField, Typography, TypographyProps, useTheme } from "@mui/material";
import { Banknote, Cake, CircleUserRound, CreditCard, Key, Mail, MapPin, PackageCheck, Phone, Receipt, ReceiptText, RectangleEllipsis, School, Shapes, UsersRound } from "lucide-react";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import DefaultButton from "@/components/ui/inputs/DefaultButton";
import DefaultTablePagination from "@/components/ui/display/DefaultTablePagination";
import { DefaultTableCell, DefaultTableRow } from "@/components/ui/display/DefaultTable";
import { doFormatCurrency, doFormatDate, doFormatDatetime, doFormatTime, getEnumValue } from "@/lib/utils";
import { PaymentDto, PaymentMethod, PaymentStatus } from "@/dto/Payment";

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

  const {data: session, status, update} = useSession();
  const { 
    contextStatus,
    payments,
  } = useUser();

  const theme = useTheme();


  
  const PaymentMethodColor = {
    CREDIT_CARD: "primary",
    BANK_TRANSFER: "info",
    MOMO: "error",
  }


  if (contextStatus === "loading") return <Loading/>;
    
  return (
    <Grid container padding={4} paddingLeft={2} rowSpacing={3}
      justifyContent={"flex-start"} alignItems={"flex-start"}
    >
      <Grid item xs={12}>
        <Grid container rowSpacing={2} direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Grid item xs={6}>
            <Typography fontSize={FontSize.super} fontWeight={"bold"} paddingLeft={1}>Lịch sử thanh toán</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <Grid item>
                <DefaultButton {...topButtonProps} variant="outlined" color="warning" startIcon={<ReceiptText/>}>Xuất PDF</DefaultButton>
              </Grid>
              <Grid item>
                <DefaultButton {...topButtonProps} variant="outlined" color="info" startIcon={<CreditCard/>}>Thanh toán</DefaultButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>  
            {/* <Card 
              id="billing-profile-card"
              sx={{
                ...Styles.Card,
                minHeight: "650px",
                }}>
              <CardContent> */}
                <Grid container spacing={2} justifyContent={"center"} alignItems={"flex-start"}>
                  <Grid item xs={12}>
                    <DefaultTablePagination
                      fullHeight
                      rows={payments}
                      renderHead={() => (
                        <DefaultTableRow>
                          <DefaultTableCell padding="checkbox">
                          <Checkbox
                              color="primary"
                              // indeterminate={numSelected > 0 && numSelected < rowCount}
                              // checked={rowCount > 0 && numSelected === rowCount}
                              // onChange={onSelectAllClick}
                              inputProps={{
                                'aria-label': 'select all desserts',
                              }}
                            />
                          </DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left">Ngày thanh toán</DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left">Số tiền</DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left">Phương thức thanh toán</DefaultTableCell>
                          <DefaultTableCell align="left">Trạng thái thanh toán</DefaultTableCell>
                          <DefaultTableCell align="center"></DefaultTableCell>
                        </DefaultTableRow>
                      )}
                      renderBody={(row , index) => (
                        <DefaultTableRow>
                          <DefaultTableCell padding="checkbox" align="center">
                            <Checkbox
                              color="primary"
                              // indeterminate={numSelected > 0 && numSelected < rowCount}
                              // checked={rowCount > 0 && numSelected === rowCount}
                              // onChange={onSelectAllClick}
                              inputProps={{
                                'aria-label': 'select all desserts',
                              }}
                            />
                          </DefaultTableCell>
                          <DefaultTableCell width={"20%"} align="left">
                            <Typography >{doFormatDate(row.createdDatetime)}</Typography>
                            <Typography fontWeight={"bold"} variant="caption">{doFormatTime(row.createdDatetime)}</Typography>
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
                            <Typography>{getEnumValue(PaymentStatus, row.paymentStatus)}</Typography>
                          </DefaultTableCell>
                          <DefaultTableCell align="center"></DefaultTableCell>
                        </DefaultTableRow>
                      )}
                    />
                  </Grid>
                </Grid>
            {/* </CardContent>
          </Card> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
   
  )
}