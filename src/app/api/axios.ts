import axios, { AxiosResponse } from "axios";
import { HOST_URL, DEFAULT_HEADERS } from "./const";
import { RequestData, ResponseError } from "./transactions";
import { getSession } from "next-auth/react";

export default axios.create({
   baseURL: HOST_URL,
})

export function createUrl(path: string) : string {
   return `${HOST_URL}${path}`;
}

export async function request({method, url, headers, data} : RequestData) : Promise<AxiosResponse | ResponseError> {
   
   let requestMsg = `[Request on ${method} ${url}] `;
   // let token = await AuthenReq.getAccessToken();
   const session = await getSession();
   if (!headers && session) {
      headers = {
         "Content-Type": "application/json",
         Authorization: `Bearer ${session.user.accessToken}`
      }
   } else if (!headers) { headers = DEFAULT_HEADERS; }
   
   console.log(requestMsg + "Request data: " + JSON.stringify(data));
   console.log(requestMsg + "Headers: " + JSON.stringify(headers));

   return axios({
      method: method,
      headers: headers,
      url: createUrl(url),
      data: data,
   })
}

