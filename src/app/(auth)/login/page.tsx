"use client"
import React, { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { 
   nextLogin
} from "@/app/api/auth/actions";
import { LoginSchema, LoginDto } from "../../../core/schema/Auth";
import { NextAuthProviders } from "@/app/api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";
import { Grid, Link, Stack, TextField, Typography } from "@mui/material";
import { FACEBOOK_COLOR, GOOGLE_COLOR } from "../../../core/lib/image";
import Image from "next/image";
import { toast } from "sonner";
import {
   DefaultButton,
   PasswordTextField
} from "../../../core/index.ui";
import { HelperText } from "@/core/index.ui";


export default function LoginForm() {
   const router = useRouter();
   const loginForm = useForm<LoginDto>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        username: "",
        password: "",
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

   useEffect(() => {
      // https://react-hook-form.com/docs/useform/watch
      const subscription = loginForm.watch((value, { name, type }) =>
         {
            // handle methods
            return 
         }
      )
      return () => subscription.unsubscribe();
   }, [loginForm.watch])

   
   const handleLogin = async (data : LoginDto) => {
      try {
         // Step 1: Login
         console.log("[1] Login data, on submit: " + JSON.stringify(data));
         let result = await nextLogin(NextAuthProviders.CREDENTIALS, data);
         console.log("Result of login: ")
         console.log(result)
         
         if (result.error) {
            switch (result.error) {
               case 'fetch failed':
                  loginForm.setError("root", {message: "Lỗi kết nối, vui lòng thử lại sau."})
                  return;
               default:
                  loginForm.setError("root", {message: result.details[0]})
                  return;
            }
         }
         toast.success("Đăng nhập thành công!")
         router.push("/")
      } catch (err) {
         console.error("Login error: " + err)
         loginForm.setError("root", {message: "Tên đăng nhập hoặc mật khẩu không chính xác."})
      }  
   }

  

   return (
      <Grid container direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"} paddingRight={3} padding={5}>
         <Grid item>
            <Typography variant="h4" fontWeight={"bold"}>Đăng nhập</Typography>
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
            <Typography variant="body2">Hoặc đăng nhập qua Let's Go</Typography>
         </Grid>
         <Grid height={10}/>
         <Grid item>
            <TextField
               {...loginForm.register("username")}
               label="Email"
               fullWidth
               error={!!loginForm.formState.errors.username}
               helperText={loginForm.formState.errors.username?.message}
               sx={{
                  width: 350,
               }}
               variant="filled"
               size="small"
            />
         </Grid>
         <Grid item >
            <PasswordTextField
                  {...loginForm.register("password")}
                  label="Mật khẩu"
                  fullWidth
                  error={!!loginForm.formState.errors.password}
                  helperText={loginForm.formState.errors.password?.message}
                  sx={{
                     width: 350,
                  }}
                  variant="filled"
                  size="small"
               />
         </Grid>
         <Grid item>
            <HelperText>{loginForm.formState.errors.root?.message}</HelperText>
         </Grid>
         <Grid item>
            <DefaultButton 
               processing={loginForm.formState.isSubmitting}
               onClick={loginForm.handleSubmit(handleLogin)} sx={{ width: 250 }}>
                  Đăng nhập
            </DefaultButton>
         </Grid>
         <Grid height={10}/>
         <Grid item>
            <Typography variant="body2"><Link href="/register" underline="hover">Đăng ký</Link> hoặc <Link href="/reset-password" underline="hover">quên mật khẩu</Link></Typography>
         </Grid>
      </Grid>
      
    )
 }

