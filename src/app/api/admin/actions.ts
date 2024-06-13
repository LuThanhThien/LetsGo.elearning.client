import { RequestMethod } from "@/app/api/const";
import { request } from "@/app/api/axios";
import { UserModel } from "@/@core/models/user/User";
import { RestApi } from "../rest";
import { FetchResponse, StandardError, StandardResponse } from "../transactions";
import { AxiosError } from "axios";



export const AdminAPI = {
   DEACTIVATE: RestApi.create(RequestMethod.PATCH, '/admin/deactivate'),
   ACTIVATE: RestApi.create(RequestMethod.PATCH, '/admin/activate'),
}

export async function deactivateUser() : Promise<FetchResponse<UserModel>> {
   try {
      let response = await request({
         method: AdminAPI.DEACTIVATE.method,
         url: AdminAPI.DEACTIVATE.url,
         data: null,
      });
      console.log("deactivateUser response.data: ", response.data);
      return StandardResponse.standlize(response).log("deactivateUser response");
   } catch (error) {
      return StandardError.standlize(error as AxiosError).log("deactivateUser error");
   }
}

export async function activateUser() : Promise<FetchResponse<UserModel>> {
   try {
      let response = await request({
         method: AdminAPI.ACTIVATE.method,
         url: AdminAPI.ACTIVATE.url,
         data: null,
      });
      return StandardResponse.standlize(response).log("deactivateUser response");
   } catch (error) {
      return StandardError.standlize(error as AxiosError).log("deactivateUser error");
   }
}
