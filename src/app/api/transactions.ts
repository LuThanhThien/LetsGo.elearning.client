import { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios"

export interface RequestData extends AxiosRequestConfig {
   method: string,
   url: string,
   headers?: any,
   data: any,
}
 
export interface ResponseError extends AxiosResponse {
   data: {
      error: boolean | string,
      status: number,
      details: string[],
      timestamp: string,
      appVersion: string
   }
}


export interface StandardResponseType<T> {
   data?: T,
   status?: number,
   path?: string,
   timestamp?: string,
   appVersion?: string,
}



export class StandardResponse<T> implements StandardResponseType<T> {
   constructor(
      public status?: number,
      public timestamp?: string,
      public data?: T,
      public appVersion?: string,
      public path?: string,
   ){
      this.status = status || HttpStatusCode.Ok;
      this.path = path || "";
      this.data = data || {} as T;
      this.timestamp = new Date().toISOString();
      this.appVersion = process.env.APP_VERSION as string;
   }
 
   static standlize<T>(response: AxiosResponse<T, any>) : StandardResponse<T> {
      return new StandardResponse<T>(
         response.status,
         response.headers.date as string,
         response.data,
         response.headers["app-version"] as string,
         response.config.url,
      );
   }
 
   // properties
   public log(message: string) {
      console.log(message + ": ", this);
      return this;
   }

   public toClient() {
      return JSON.parse(JSON.stringify(this));
   }
}

export interface StandardErrorType<T> {
   error?: boolean | string,
   status?: number,
   path?: string,
   details?: string[],
   response?: StandardResponse<T>,
   timestamp?: string,
   appVersion?: string,
}

export class StandardError<T> implements StandardErrorType<T> {
   constructor(
      public error?: boolean | string,
      public status?: number,
      public path?: string,
      public details?: string[],
      public timestamp?: string,
      public appVersion?: string,
   ){
   this.error = error || true;
   this.path = path || "";
   this.status = status || HttpStatusCode.InternalServerError;
   this.details = details ? details : error ? [error.toString()] : ["Lỗi xác thực, vui lòng thử lại sau"];
   this.timestamp = timestamp || new Date().toISOString();
   this.appVersion = appVersion || process.env.APP_VERSION as string;
   }
 
   static standlize<T>(error: AxiosError<T, any>) : StandardError<T> {
      if (error.response) {
         console.error("Standard Error response: ", error.response);
         return new StandardError<T>(
         (error.response as ResponseError).data.error,
         (error.response as ResponseError).data.status,
         (error.response as ResponseError).config.url,
         (error.response as ResponseError).data.details,
         (error.response as ResponseError).data.timestamp,
         (error.response as ResponseError).data.appVersion,
         );
      } else if (error.request) {
         // console.error("Standard Error request: ", error.request);
         return new StandardError<T>(
            "Lỗi xác thực, vui lòng thử lại sau.",
            HttpStatusCode.BadRequest,
            (error.request as RequestData).url,
            ["Lỗi xác thực, vui lòng thử lại sau."],
            new Date().toISOString(),
            process.env.APP_VERSION as string,
         );
      } else {
         // console.error("Standard Error: ", error.message);
         return new StandardError<T>(
            error.message,
            HttpStatusCode.BadRequest,
            "",
            ["Lỗi xác thực, vui lòng thử lại sau."],
            new Date().toISOString(),
            process.env.APP_VERSION as string,
         );
      }
   }
 
   // properties
   public log(message: string) {
      console.error(message + ": ", this);
      return this;
   }

   public toClient() {
      return JSON.parse(JSON.stringify(this));
   }
}
 
export type FetchResponse<T> = StandardResponse<T> | StandardError<T> | any;