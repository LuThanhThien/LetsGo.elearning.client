"use client";;
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { resetPassword } from "@/app/api/auth/actions";
import { ResetPasswordOTPDto, ResetPasswordOTPSchema } from "../../../../@share/schema/Auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Grid, Typography } from "@mui/material";
import { toast } from "sonner";
import { 
   DefaultButton, 
   HelperText, 
   PasswordTextField 
} from "../../../../@share/index.ui";
import { Colors } from "@/@share/lib/style";
import { use, useEffect, useState } from "react";


export default function ResetPasswordPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [valid, setValid] = useState(false)
   const resetPasswordForm = useForm<ResetPasswordOTPDto>({
      resolver: zodResolver(ResetPasswordOTPSchema),
      defaultValues: {
         username: searchParams.get("username") || "",
         providedOtp: searchParams.get("totp") || "",
         resetPassword: "",
         confirmPassword: "",
      },
   })

   useEffect(() => {
      if (!searchParams.get("username") || !searchParams.get("totp")) {
         router.push("/403")
      }
      setValid(true);
   }, [])

   
   const handleResetPassword = async (data : ResetPasswordOTPDto) => {
      try {
         let result = await resetPassword(data);
         if (result?.error) {
            switch (result.error) {
               case 'fetch failed':
                  resetPasswordForm.setError("root", {message: "Lỗi kết nối, vui lòng thử lại sau."})
                  return;
               default:
                  resetPasswordForm.setError("root", {message: result.details[0]})
                  return;
            }
         }
         toast.success("Đặt lại mật khẩu thành công, vui lòng đăng nhập lại.")
         router.push("/login")
      } catch (err) {
         console.error("Login error: " + err)
         resetPasswordForm.setError("root", {message: "Lỗi xác thực, vui lòng thử lại sau."})
      }  
   }

   if (!valid) return;

   return (
      <Grid container direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"} paddingRight={3} padding={5}>
         <Grid item>
            <Typography variant="h5" fontWeight={"bold"}>Đặt lại mật khẩu</Typography>
         </Grid>
         <Grid height={10}/>
         <Grid item>
            <Typography variant="subtitle1">Tài khoản:
               <Typography variant="subtitle1" fontWeight={"bold"} display="inline" color={Colors.secondary}> {resetPasswordForm.getValues("username")}</Typography>
            </Typography>
         </Grid>
         <Grid item >
            <PasswordTextField
                  {...resetPasswordForm.register("resetPassword")}
                  label="Mật khẩu mới"
                  fullWidth
                  error={!!resetPasswordForm.formState.errors.resetPassword}
                  helperText={resetPasswordForm.formState.errors.resetPassword?.message}
                  sx={{
                     width: 350,
                  }}
                  variant="filled"
                  size="small"
               />
         </Grid>
         <Grid item >
            <PasswordTextField
                  {...resetPasswordForm.register("confirmPassword")}
                  label="Xác nhận mật khẩu"
                  fullWidth
                  error={!!resetPasswordForm.formState.errors.confirmPassword}
                  helperText={resetPasswordForm.formState.errors.confirmPassword?.message}
                  sx={{
                     width: 350,
                  }}
                  variant="filled"
                  size="small"
               />
         </Grid>
         <Grid item>
            <HelperText>{resetPasswordForm.formState.errors.root?.message}</HelperText>
         </Grid>
         <Grid item>
            <DefaultButton 
               processing={resetPasswordForm.formState.isSubmitting}   
               onClick={resetPasswordForm.handleSubmit(handleResetPassword)} sx={{ width: 250 }}>
               Đổi mật khẩu
            </DefaultButton>
         </Grid>
         <Grid height={10}/>
      </Grid>
      
    )
 }

