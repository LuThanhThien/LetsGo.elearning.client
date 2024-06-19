import { request } from "@/app/api/axios";
import { FetchResponse, StandardError, StandardResponse } from "@/app/api/transactions";
import { LoginDto, RegisterDto, ResetPasswordOTPDto } from "../../../@share/index.schema";
import { AuthResponse, OTPEntryModel, UserModel } from "../../../@share/index.models";
import { signIn } from "next-auth/react";
import { NextAuthProviders } from "@/app/api/auth/[...nextauth]/route";
import { AxiosError, HttpStatusCode } from "axios";
import { DEFAULT_HEADERS, RequestMethod } from "../const";
import { RestApi } from "../rest";


export const ACCESS_TOKEN_KEY = "jwt_access_token";
export const REFRESH_TOKEN_KEY = "jwt_refresh_token";

export const AuthAPI = {
   AUTH: RestApi.create(RequestMethod.GET, '/auth?:username'),
   LOGIN: RestApi.create(RequestMethod.POST, '/auth/login'),
   REGISTER: RestApi.create(RequestMethod.POST, '/auth/register'),
   LOGOUT: RestApi.create(RequestMethod.POST, '/auth/logout'),
   GET_TOTP: RestApi.create(RequestMethod.GET, '/auth/totp'),
   FORGOT_PASSWORD: RestApi.create(RequestMethod.POST, '/auth/forgot-password?:username'),
   RESET_PASSWORD: RestApi.create(RequestMethod.PATCH, '/auth/reset-password'),
   GET_OTP_FROM_CODE: RestApi.create(RequestMethod.GET, '/auth/otp/:otpCode'),
}


export async function nextLogin(provider: NextAuthProviders, data : LoginDto) : Promise<FetchResponse<AuthResponse>> {
   try {
      let res;
      if (provider === NextAuthProviders.CREDENTIALS) {
         res = await signIn(
            provider,
            {
               username: data.username,
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

export async function login(data : LoginDto) : Promise<FetchResponse<AuthResponse>> {
   try {
      const res = await request({
         method: AuthAPI.LOGIN.method,
         headers: DEFAULT_HEADERS,
         url: AuthAPI.LOGIN.url,
         data: JSON.stringify(data)
      });
      return StandardResponse.standlize(res).log("Login response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Login error");    
   }
}

export async function nextRegister(data: RegisterDto) : Promise<FetchResponse<AuthResponse>> {
   try {
      if (data.confirmPassword !== data.password) {
         return new StandardError("Mật khẩu xác nhận không trùng khớp", HttpStatusCode.BadRequest).log("Register error message");
      }
      const res = await signIn(
            NextAuthProviders.REGISTER,
            {
               fullName: data.fullName,
               username: data.username,
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

export async function register(data: RegisterDto) : Promise<FetchResponse<AuthResponse>> {
   try {
      if (data.confirmPassword !== data.password) {
         return new StandardError("Mật khẩu xác nhận không trùng khớp", HttpStatusCode.BadRequest).log("Register error message");
      }
      let res = await request({
         method: AuthAPI.REGISTER.method,
         url: AuthAPI.REGISTER.url,
         data: data
      })
      return StandardResponse.standlize(res).log("Register response");
   }
   catch (err) {
      return StandardError.standlize(err as AxiosError).log("Register error message");
   }
} 


export async function getUserByUsername(username: string) : Promise<FetchResponse<UserModel>> {
   try {
      let res = await request({
         method: AuthAPI.AUTH.method,
         url: AuthAPI.AUTH.url,
         data: {username: username}
      })
      return StandardResponse.standlize(res).log("Get user by username response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Get user by username error");
   }
}

export async function logout() : Promise<FetchResponse<AuthResponse>> {
   try {
      let res = await request({
         method: AuthAPI.LOGOUT.method,
         url: AuthAPI.LOGOUT.url,
         data: {}
      })
      return StandardResponse.standlize(res).log("Logout response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Logout error");
   }
}

export async function getTOTP() : Promise<FetchResponse<OTPEntryModel>> {
   try {
      let res = await request({
         method: AuthAPI.GET_TOTP.method,
         url: AuthAPI.GET_TOTP.url,
         data: {}
      })
      return StandardResponse.standlize(res).log("Get TOTP response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Get TOTP error");
   }
}

export async function forgotPassword(username: string) : Promise<FetchResponse<OTPEntryModel>> {
   try {
      let res = await request({
         method: AuthAPI.FORGOT_PASSWORD.method,
         url: AuthAPI.FORGOT_PASSWORD.url,
         data: {username: username}
      })
      return StandardResponse.standlize(res).log("Forgot password response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Forgot password error");
   }
}

export async function resetPassword(resetPasswordDto: ResetPasswordOTPDto) : Promise<FetchResponse<AuthResponse>> {
   try {
      let res = await request({
         method: AuthAPI.RESET_PASSWORD.method,
         url: AuthAPI.RESET_PASSWORD.url,
         data: resetPasswordDto
      })
      return StandardResponse.standlize(res).log("Reset password response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Reset password error");
   }
}

export async function getOTPFromCode(otpCode: string) : Promise<FetchResponse<OTPEntryModel>> {
   try {
      let res = await request({
         method: AuthAPI.GET_OTP_FROM_CODE.method,
         url: AuthAPI.GET_OTP_FROM_CODE.url,
         data: {otpCode: otpCode}
      })
      return StandardResponse.standlize(res).log("Get OTP from code response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Get OTP from code error");
   }
}

