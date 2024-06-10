"use client"
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { nextLogin, register } from "@/app/api/auth/actions";
import {  RegisterSchema, RegisterDto } from "../../../core/schema/Auth";
import { NextAuthProviders } from "@/app/api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";
import { FormHelperText, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import { FACEBOOK_COLOR, GOOGLE_COLOR } from "../../../core/lib/image";
import Image from "next/image";
import { toast } from "sonner";
import { randomChoice } from "../../../core/lib/utils";
import { ListAvatars } from "../../../core/lib/avatar";
import { Styles } from "@/core/lib/style";
import { 
   DefaultButton, 
   PasswordTextField 
} from "../../../core/index.ui";



export default function RegisterForm() {
   const router = useRouter();
   const registerForm = useForm<RegisterDto>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         fullName: "",
         username: "",
         password: "",
         confirmPassword: "",
      },
   })


    const loginLogoStyle = {
        padding: 5, 
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        cursor: "pointer",
        paddingRight: 5,
    }

   
   const handleRegister = async (data : RegisterDto) => {
      try {
         data.avatar = randomChoice(...ListAvatars).src;
         let result = await register(data);
         
         if (result?.error) {
            switch (result.error) {
               case 'fetch failed':
                  registerForm.setError("root", {message: "Lỗi kết nối, vui lòng thử lại sau."})
                  return;
               default:
                  registerForm.setError("root", {message: result.details[0]})
                  return;
            }
         }
         
         const loginData = {username: data.username, password: data.password}
         console.log("Login data is")
         console.log(loginData)
         let signInResult = await nextLogin(NextAuthProviders.CREDENTIALS, loginData);
         toast.success("Đăng ký thành công!")
         if (signInResult.error) {
            switch (signInResult.error) {
               case 'fetch failed':
                  registerForm.setError("root", {message: "Lỗi kết nối, vui lòng đăng nhập lại bằng tài khoản mới tạo."})
                  return;
               default:
                  registerForm.setError("root", {message: signInResult.details[0]})
                  return;
            }
         }
         router.push("/")
      } catch (err) {
         console.error("Login error: " + err)
         registerForm.setError("root", {message: "Lỗi xác thực, vui lòng thử lại sau."})
      }  
   }

  

   return (
      <Grid container direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"} paddingRight={3} padding={5}>
         <Grid item>
            <Typography variant="h4" fontWeight={"bold"}>Đăng ký</Typography>
         </Grid>
         <Grid item>
            <Stack direction={"row"} spacing={1}>
                <Image src={GOOGLE_COLOR.src} alt="Google Icon" width={50} height={50} 
                style={loginLogoStyle} />
                <Image src={FACEBOOK_COLOR.src} alt="Facebook Icon" width={50} height={50} 
                style={loginLogoStyle} />
            </Stack>
            
         </Grid>
         <Grid item>
            <Typography variant="body2">Hoặc đăng ký qua Let's Go</Typography>
         </Grid>
         <Grid height={10}/>
         <Grid item>
            <TextField
               {...registerForm.register("fullName")}
               label="Họ và Tên"
               fullWidth
               error={!!registerForm.formState.errors.fullName}
               helperText={registerForm.formState.errors.fullName?.message}
               sx={{
                  width: 350,
               }}
               variant="filled"
               size="small"
            />
         </Grid>
         <Grid item>
            <TextField
               {...registerForm.register("username")}
               label="Email"
               fullWidth
               error={!!registerForm.formState.errors.username}
               helperText={registerForm.formState.errors.username?.message}
               sx={{
                  width: 350,
               }}
               variant="filled"
               size="small"
            />
         </Grid>
         <Grid item >
            <PasswordTextField
                  {...registerForm.register("password")}
                  label="Mật khẩu"
                  fullWidth
                  error={!!registerForm.formState.errors.password}
                  helperText={registerForm.formState.errors.password?.message}
                  sx={{
                     width: 350,
                  }}
                  variant="filled"
                  size="small"
               />
         </Grid>
         <Grid item >
            <PasswordTextField
                  {...registerForm.register("confirmPassword")}
                  label="Xác nhận mật khẩu"
                  fullWidth
                  error={!!registerForm.formState.errors.confirmPassword}
                  helperText={registerForm.formState.errors.confirmPassword?.message}
                  sx={{
                     width: 350,
                  }}
                  variant="filled"
                  size="small"
               />
         </Grid>
         <Grid item>
            <FormHelperText sx={Styles.FormHelperText} error>{registerForm.formState.errors.root?.message}</FormHelperText>
         </Grid>
         <Grid item>
            <DefaultButton 
               processing={registerForm.formState.isSubmitting}   
               onClick={registerForm.handleSubmit(handleRegister)} sx={{ width: 250 }}>
               Đăng ký
            </DefaultButton>
         </Grid>
         <Grid height={10}/>
         <Grid item>
            <Typography variant="body2">
                Đã có tài khoản? <Link href="/login" underline="hover">Đăng nhập</Link>
            </Typography>

         </Grid>
      </Grid>
      
    )
 }

