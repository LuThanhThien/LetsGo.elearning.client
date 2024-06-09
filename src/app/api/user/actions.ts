import { ChangePasswordDto, UserDto, UserUpdateDto } from "@/dto/User";
import { request } from "../axios";
import { AuthAPI, RequestMethod, UserAPI } from "../const";
import { FetchResponse, StandardError, StandardResponse } from "../transactions";
import { Axios, AxiosError, HttpStatusCode } from "axios";


export async function getUserByUsername(username: string) : Promise<FetchResponse<UserDto>> {
   try {
      let res = await request({
         method: RequestMethod.GET,
         url: AuthAPI.FIND_USER + `?username=${username}`,
         data: null
      })
   return StandardResponse.standlize(res).log("Find user by emailTemplate response");
   } catch (err) {
   return StandardError.standlize(err as AxiosError).log("Find user by emailTemplate error");
   }
}

 
export async function getUserByUserId(userId: number) : Promise<FetchResponse<UserDto>> {
   try {
      let res = await request({
         method: RequestMethod.GET,
         url: UserAPI.USER + `?id=${userId}`,
         data: null
      })
      return StandardResponse.standlize(res).log("Find user by id response");
   } catch (err) {
      StandardError.standlize(err as AxiosError).log("Find user by id error");
      return null;
   }
}  

export async function updateUser(data: UserUpdateDto) : Promise<FetchResponse<UserDto>> {
   try {
      let res = await request({
         method: RequestMethod.PUT,
         url: UserAPI.USER,
         data: JSON.stringify(data)
      })
      return StandardResponse.standlize(res).log("Update user response");
   } catch (err) {
      console.error("Update user error: ", err);   
      return StandardError.standlize(err as AxiosError).log("Update user error");
   }
}

export async function changePassword(data: ChangePasswordDto) : Promise<FetchResponse<UserDto>> {
   try {
      if (data.newPassword !== data.confirmPassword) {
         return new StandardError("Mật khẩu xác nhận không trùng khớp", HttpStatusCode.BadRequest, UserAPI.CHANGE_PASSWORD).log("Change password error");
      }
      let res = await request({
         method: RequestMethod.PUT,
         url: UserAPI.CHANGE_PASSWORD,
         data: JSON.stringify(data)
      })
      return StandardResponse.standlize(res).log("Change password response");
   } catch (err) {
      console.error("Change password error: ", err);   
      return StandardError.standlize(err as AxiosError).log("Change password error");
   }
}