import { AdminAPI, RequestMethod } from "@/app/api/const";
import { request } from "@/app/api/axios";
import { UserDto } from "@/dto/User";

export async function getListUser() : Promise<UserDto[] | null> {
   try {
      let response = await request({
         method: RequestMethod.GET,
         url: AdminAPI.LIST_USER,
         data: null,
      });
      console.log("getListUser response.data: ", response.data);
      console.log("Type of response.data: ", typeof response.data);
      console.log("Lenth data: " + response.data.length);
      return response.data;
   } catch (error) {
      console.error(error);
      return null;
   }
}

