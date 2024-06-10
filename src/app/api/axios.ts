import axios, { AxiosResponse } from "axios";
import { HOST_URL, DEFAULT_HEADERS, API_PREFIX } from "./const";
import { RequestData, ResponseError } from "./transactions";
import { getSession } from "next-auth/react";
import { RestApi } from "./rest";

export default axios.create({
   baseURL: `${HOST_URL}`,
})

export async function request({method, url, data, headers} : RequestData) : Promise<AxiosResponse | ResponseError> {
   let requestMsg = `[Request on ${method} ${url}] `;
   // let token = await AuthenReq.getAccessToken();
   const session = await getSession();
   if (!headers && session && session.user?.accessToken) {
      headers = {
         "Content-Type": "application/json",
         Authorization: `Bearer ${session.user?.accessToken}`
      }
   } else if (!headers) { headers = DEFAULT_HEADERS; }
   const fullUrl = RestApi.createUrl(url, data);
   console.log(requestMsg + "Request data: " + JSON.stringify(data));
   console.log(requestMsg + "Headers: " + JSON.stringify(headers));

   return axios({
      method: method,
      headers: headers,
      url: fullUrl,
      data: data,
   })
}
