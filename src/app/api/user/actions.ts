import { RequestMethod } from "../const";
import { FetchResponse, StandardError, StandardResponse } from "../transactions";
import { AxiosError } from "axios";
import { request } from "../axios";
import { RestApi } from "../rest";
import { UserModel } from "@/@core/models/user/User";
import { UserUpdateDto } from "@/@core/schema/User";


export const UserAPI = {
   USER: RestApi.create(RequestMethod.GET, '/user'),
   PASSWORD: RestApi.create(RequestMethod.PATCH, '/user/password'),
   UPDATE: RestApi.create(RequestMethod.PATCH, '/user'),
   LIST: RestApi.create(RequestMethod.GET, '/user/list'),
   SAVE_BOOKMARK: RestApi.create(RequestMethod.POST, '/user/bookmark/:moduleId/save'),
   UNSAVE_BOOKMARK: RestApi.create(RequestMethod.POST, '/user/bookmark/:bookmarkId/unsave'),
}


export async function getUserList() : Promise<FetchResponse<UserModel>> {
   try {
      let res = await request({
         method: UserAPI.LIST.method,
         url: UserAPI.LIST.url,
         data: null
      })
      return StandardResponse.standlize(res).log("Get user list response");
   } catch (err) {
      console.error("Get user list error: ", err);   
      return StandardError.standlize(err as AxiosError).log("Get user list error");
   }
}

export async function getUser() : Promise<FetchResponse<UserModel>> {
   try {
      let res = await request({
         method: UserAPI.USER.method,
         url: UserAPI.USER.url,
         data: null
      })
      return StandardResponse.standlize(res).log("Get user response");
   } catch (err) {
      console.error("Get user error: ", err);   
      return StandardError.standlize(err as AxiosError).log("Get user error");
   }
}

export async function updateUser(data: UserUpdateDto) : Promise<FetchResponse<UserModel>> {
   try {
      let res = await request({
         method: UserAPI.UPDATE.method,
         url: UserAPI.UPDATE.url,
         data: data
      })
      return StandardResponse.standlize(res).log("Update user response");
   } catch (err) {
      console.error("Update user error: ", err);   
      return StandardError.standlize(err as AxiosError).log("Update user error");
   }
}

export async function changePassword(data: {currentPassword: string, newPassword: string}) : Promise<FetchResponse<UserModel>> {
   try {
      console.log("Change password data: ", data);
      let res = await request({
         method: UserAPI.PASSWORD.method,
         url: UserAPI.PASSWORD.url,
         data: data
      })
      return StandardResponse.standlize(res).log("Change password response");
   } catch (err) {
      return StandardError.standlize(err as AxiosError).log("Change password error");
   }
}


export async function saveModule(moduleId: string) : Promise<FetchResponse<UserModel>> {
   try {
      let res = await request({
         method: UserAPI.SAVE_BOOKMARK.method,
         url: UserAPI.SAVE_BOOKMARK.url,
         data: {moduleId: moduleId}
      })
      return StandardResponse.standlize(res).log("Save bookmark response");
   } catch (err) {
      console.error("Save bookmark error: ", err);   
      return StandardError.standlize(err as AxiosError).log("Save bookmark error");
   }
}

export async function unsaveModule(bookmarkId: string) : Promise<FetchResponse<UserModel>> {
   try {
      let res = await request({
         method: UserAPI.UNSAVE_BOOKMARK.method,
         url: UserAPI.UNSAVE_BOOKMARK.url,
         data: {bookmarkId: bookmarkId}
      })
      return StandardResponse.standlize(res).log("Unsave bookmark response");
   } catch (err) {
      console.error("Unsave bookmark error: ", err);   
      return StandardError.standlize(err as AxiosError).log("Unsave bookmark error");
   }
}