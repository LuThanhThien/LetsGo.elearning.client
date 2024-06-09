import { request } from "@/app/api/axios";
import { FetchResponse, StandardError, StandardResponse } from "@/app/api/transactions";
import { AuthAPI, RequestMethod } from "@/app/api/const";
import { LoginDto, RegisterDto } from "@/dto/Auth";
import { UserDto } from "@/dto/User";
import { signIn } from "next-auth/react";
import { NextAuthProviders } from "@/app/api/auth/[...nextauth]/route";
import { AxiosError, HttpStatusCode } from "axios";



export async function nextLogin(provider: NextAuthProviders, data : LoginDto) : Promise<FetchResponse<UserDto>> {
   try {
      let res;
      if (provider === NextAuthProviders.CREDENTIALS) {
         res = await signIn(
            provider,
            {
               emailTemplate: data.username,
               password: data.password,
               redirect: false,
            },
         )
      } else {
         res = await signIn(provider, {callbackUrl: "/", redirect: false});
      }
      if (res?.error) {
         console.log("Login failed: " + res.error);
         return new StandardError(res.error, res.status, res.url || "").log("Login error");
      }
      return new StandardResponse(res?.status, res?.url || "").log("Login response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Login error");    
      
   }
}

export async function login(data : LoginDto) : Promise<FetchResponse<UserDto>> {
   try {
      const res = await request({
         method: RequestMethod.POST,
         headers: {"Content-Type": "application/json"},
         url: AuthAPI.LOGIN,
         data: JSON.stringify(data)
      });
      return StandardResponse.standlize(res).log("Login response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Login error");    
   }
}

export async function nextRegister(data: RegisterDto) : Promise<FetchResponse<UserDto>> {
   try {
      if (data.confirmPassword !== data.password) {
         return new StandardError("Mật khẩu xác nhận không trùng khớp", HttpStatusCode.BadRequest).log("Register error message");
      }
      const res = await signIn(
            NextAuthProviders.REGISTER,
            {
               fullName: data.fullName,
               emailTemplate: data.username,
               password: data.password,
               confirmPassword: data.confirmPassword,
               avatar: data.avatar,
               redirect: false,
            },
      )
      if (res?.error) {
         console.log("Register failed: " + res.error);
         return new StandardError(res.error, res.status, res.url || "").log("Register error");
      }
      return new StandardResponse(res?.status, res?.url || "").log("Register response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Register error");    
   }
} 

export async function register(data: RegisterDto) : Promise<FetchResponse<UserDto>> {
   try {
      if (data.confirmPassword !== data.password) {
         return new StandardError("Mật khẩu xác nhận không trùng khớp", HttpStatusCode.BadRequest).log("Register error message");
      }
      let res = await request({
         method: RequestMethod.POST,
         url: AuthAPI.REGISTER,
         data: data
      })
      return StandardResponse.standlize(res).log("Register response");
   }
   catch (err) {
      return StandardError.standlize(err as AxiosError).log("Register error message");
   }
} 


