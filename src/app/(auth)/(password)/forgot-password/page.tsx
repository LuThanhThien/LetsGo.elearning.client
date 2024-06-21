"use client";;
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { forgotPassword } from "@/app/api/auth/actions";
import { ForgotPasswordDto, ForgorPasswordSchema } from "../../../../@share/schema/Auth";
import { Grid, Link, Stack, TextField, Typography } from "@mui/material";
import { DefaultButton, HelperText } from "../../../../@share/index.ui";
import { useState } from "react";
import { Colors } from "@/@share/lib/style";



export default function ResetPasswordPage() {
   const [isSent, setIsSent] = useState(false)
   const forgotPasswordForm = useForm<ForgotPasswordDto>({
      resolver: zodResolver(ForgorPasswordSchema),
      defaultValues: {
         username: "",
      }
   })

   
   async function handleSendOtp (data : ForgotPasswordDto) {
      try {
         console.log("Sending OTP... ", data)
         let result = await forgotPassword(data.username);
         if (result?.error) {
            switch (result.error) {
               case 'fetch failed':
                  forgotPasswordForm.setError("root", {message: "Lỗi kết nối, vui lòng thử lại sau."})
                  return;
               default:
                  forgotPasswordForm.setError("root", {message: result.details[0]})
                  return;
            }
         }
         console.log("OTP sent! ", result)
         setIsSent(true);
      } catch (err) {
         console.error("Login error: " + err)
         forgotPasswordForm.setError("root", {message: "Lỗi xác thực, vui lòng thử lại sau."})
      }  
   }
  
   if (isSent) {
      return (
      <Grid container direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"} paddingRight={3} padding={5}>
         <Grid item>
            <Typography variant="h5" fontWeight={"bold"}>Quên mật khẩu</Typography>
         </Grid>
         <Grid height={10}/>
         <Grid item>
            <Typography variant="subtitle1">
               Vui lòng kiểm tra email mới nhất và làm theo hướng dẫn!
            </Typography>
         </Grid>
      </Grid>
      )
   }
   

   return (
      <Grid container direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"} paddingRight={3} padding={5}>
         <Grid item>
            <Typography variant="h5" fontWeight={"bold"}>Quên mật khẩu</Typography>
         </Grid>
         <Grid item>
            <Typography variant="subtitle1">Nhập email của bạn</Typography>
         </Grid>
         <Grid height={10}/>
         <Grid item>
            <TextField
               {...forgotPasswordForm.register("username")}
               label="Email"
               fullWidth
               error={!!forgotPasswordForm.formState.errors.username}
               helperText={forgotPasswordForm.formState.errors.username?.message}
               sx={{
                  width: 350,
               }}
               variant="filled"
               size="small"
            />
         </Grid>
         <Grid item>
            <HelperText>{forgotPasswordForm.formState.errors.root?.message}</HelperText>
         </Grid>
         <Grid item>
            <DefaultButton 
               processing={forgotPasswordForm.formState.isSubmitting}   
               onClick={forgotPasswordForm.handleSubmit(handleSendOtp)} sx={{ width: 250 }}>
               Đặt lại mật khẩu
            </DefaultButton>
         </Grid>
         <Grid height={10}/>
         <Grid item>
            <Typography variant="body2">
                Chưa có tài khoản? <Link href="/register" underline="hover">Đăng ký</Link>
            </Typography>
         </Grid>
      </Grid>
    )
 }

