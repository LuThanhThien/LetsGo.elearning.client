import { AuthAPI, RequestMethod, UserAPI } from "../../const";
import { FetchResponse, StandardError, StandardResponse } from "../../transactions";
import { AxiosError } from "axios";
import { request } from "../../axios";
import { PaymentDto } from "@/dto/Payment";


export async function getPaymentList(username: string) : Promise<FetchResponse<PaymentDto>> {
    try {
       let res = await request({
          method: RequestMethod.GET,
          url: UserAPI.PAYMENT + `?username=${username}`,
          data: null
       })
       return StandardResponse.standlize(res).log("Get payment list response");
    } catch (err) {
       console.error("Get payment list error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Get payment list error");
    }
 }