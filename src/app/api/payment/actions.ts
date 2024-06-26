import { RequestMethod } from "../const";
import { FetchResponse, StandardError, StandardResponse } from "../transactions";
import { AxiosError } from "axios";
import { request } from "../axios";
import { PaymentModel } from "@/@share/models/user/Payment";
import { RestApi } from "../rest";
import { JsonValue } from "@/@share/index.models";


export const PaymentAPI = {
   PAYMENT: RestApi.create(RequestMethod.GET, '/payment'),
   BY_ID: RestApi.create(RequestMethod.GET, '/payment/:id'),
   METHODS: RestApi.create(RequestMethod.GET, '/payment/methods'),
   CHECKOUT: RestApi.create(RequestMethod.PATCH, '/payment/:id/checkout'),
   CALLBACK: RestApi.create(RequestMethod.GET, '/payment/:id/callback?...params'),
   VNP_IPN: RestApi.create(RequestMethod.POST, '/payment/vnp_ipn?...params'),
}


export async function getPaymentList() : Promise<FetchResponse<PaymentModel>> {
    try {
       let res = await request({
          method: PaymentAPI.PAYMENT.method,
          url: PaymentAPI.PAYMENT.url,
          data: null
       })
       return StandardResponse.standlize(res).log(PaymentAPI.PAYMENT.infoMessage());
    } catch (err) {
       console.error(PaymentAPI.PAYMENT.errorMessage(), err);   
       return StandardError.standlize(err as AxiosError).log(PaymentAPI.PAYMENT.errorMessage());
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

export async function callbackPayment(id: string, params: JsonValue | string) : Promise<FetchResponse<PaymentModel>> {
    try {
       let res = await request({
          method: PaymentAPI.CALLBACK.method,
          url: PaymentAPI.CALLBACK.url,
          data: {id: id, params: params}
       })
       return StandardResponse.standlize(res).log("Get payment callback response");
    } catch (err) {
       console.error("Get payment webhook error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Get payment callback error");
    }
}

export async function callbackVNPayIpn(params: JsonValue | string) : Promise<FetchResponse<PaymentModel>> {
   try {
      let res = await request({
         method: PaymentAPI.VNP_IPN.method,
         url: PaymentAPI.VNP_IPN.url,
         data: {params: params}
      })
      return StandardResponse.standlize(res).log("Get payment callback VNPay IPN response");
   } catch (err) {
      console.error("Get payment webhook error: ", err);   
      return StandardError.standlize(err as AxiosError).log("Get payment callback VNPay IPN error");
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