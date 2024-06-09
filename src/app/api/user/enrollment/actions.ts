import { AuthAPI, RequestMethod, UserAPI } from "../../const";
import { FetchResponse, StandardError, StandardResponse } from "../../transactions";
import { AxiosError } from "axios";
import { request } from "../../axios";
import { EnrollmentDto } from "@/dto/Enrollment";


export async function getTotalNumberModules(username: string) : Promise<FetchResponse<Object>> {
    try {
       let res = await request({
          method: RequestMethod.GET,
          url: UserAPI.TOTAL_MODULES + `?username=${username}`,
          data: null
       })
       return StandardResponse.standlize(res).log("Get total number of modules response");
    } catch (err) {
       console.error("Get total number of modules error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Get total number of modules error");
    }
 }

export async function getEnrollmentById(id: string) : Promise<FetchResponse<EnrollmentDto>> {
    try {
       let res = await request({
          method: RequestMethod.GET,
          url: UserAPI.ENROLLMENT + `?id=${id}`,
          data: null
       })
       return StandardResponse.standlize(res).log("Get enrollment by id response");
    } catch (err) {
       console.error("Get enrollment by id error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Get enrollment by id error");
    }
 }