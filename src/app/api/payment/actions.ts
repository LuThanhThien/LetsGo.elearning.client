import { RequestMethod } from "../const";
import { FetchResponse, StandardError, StandardResponse } from "../transactions";
import { AxiosError } from "axios";
import { request } from "../axios";
import { PaymentModel } from "@/core/models/user/Payment";
import { UserAPI } from "../user/actions";
import { RestApi } from "../rest";


export const PaymentAPI = {
   PAYMENT: RestApi.create(RequestMethod.GET, '/payment'),
   BY_ID: RestApi.create(RequestMethod.GET, '/payment/:id'),
   METHODS: RestApi.create(RequestMethod.GET, '/payment/methods'),
   CHECKOUT: RestApi.create(RequestMethod.PATCH, '/payment/:id/checkout'),
   WEBHOOK: RestApi.create(RequestMethod.GET, '/payment/:id/webhook'),
}


export async function getPaymentList() : Promise<FetchResponse<PaymentModel>> {
    try {
       let res = await request({
          method: PaymentAPI.PAYMENT.method,
          url: PaymentAPI.PAYMENT.url,
          data: null
       })
       return StandardResponse.standlize(res).log("Get payment list response");
    } catch (err) {
       console.error("Get payment list error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Get payment list error");
    }
}

export async function getPaymentMethods() : Promise<FetchResponse<PaymentModel>> {
    try {
       let res = await request({
          method: PaymentAPI.METHODS.method,
          url: PaymentAPI.METHODS.url,
          data: null
       })
       return StandardResponse.standlize(res).log("Get payment methods response");
    } catch (err) {
       console.error("Get payment methods error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Get payment methods error");
    }
}

export async function checkoutPayment(id: string) : Promise<FetchResponse<PaymentModel>> {
    try {
       let res = await request({
          method: PaymentAPI.CHECKOUT.method,
          url: PaymentAPI.CHECKOUT.url,
          data: {id: id}
       })
       return StandardResponse.standlize(res).log("Checkout payment response");
    } catch (err) {
       console.error("Checkout payment error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Checkout payment error");
    }
}

export async function getPaymentWebhook(id: string) : Promise<FetchResponse<PaymentModel>> {
    try {
       let res = await request({
          method: PaymentAPI.WEBHOOK.method,
          url: PaymentAPI.WEBHOOK.url,
          data: {id: id}
       })
       return StandardResponse.standlize(res).log("Get payment webhook response");
    } catch (err) {
       console.error("Get payment webhook error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Get payment webhook error");
    }
}

export async function getPaymentById(id: string) : Promise<FetchResponse<PaymentModel>> {
    try {
       let res = await request({
          method: PaymentAPI.BY_ID.method,
          url: PaymentAPI.BY_ID.url,
          data: {id: id}
       })
       return StandardResponse.standlize(res).log("Get payment by id response");
    } catch (err) {
       console.error("Get payment by id error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Get payment by id error");
    }
}