import { API_PREFIX, HOST_URL, RequestMethod } from "./const";

export class RestApi {
   public method: RequestMethod;
   public url: string;

   constructor(method: RequestMethod, url: string) {
      this.method = method;
      this.url = url;
   }

   public static create(method: RequestMethod, url: string) {
      return new RestApi(method, url);
   }


   static getPathVariable(path: string, data: any) : string {
      const uriList = path.split("?");
      if (uriList.length <= 1) return path;
      let query = uriList[0] + "?";
      const queryList = uriList[1].split("&");
      for (let j = 0; j < queryList.length; j++) {
         if (!queryList[j].startsWith(":")) continue;
         let key = queryList[j].substring(1);
         const value = data[key] || "";
         delete data[key];
         query += `${key}=${value}&`;
      }
      return query;
   }

   static createUrl(path: string, data?: any) : string {
      if (!data) { 
         console.log("URL: " + `${HOST_URL}/${API_PREFIX}${path}`); 
         return `${HOST_URL}/${API_PREFIX}${path}`; 
      }
      let list : string[] = path.split("/");
      for (let i = 0; i < list.length; i++) {
         if (list[i] === "") { 
            list.splice(i, 1); i--; 
            continue; 
         } else if (list[i].startsWith(":")) {
            let key = list[i].substring(1);
            let param = ""
            if (key.includes("?")) {
               key = key.split("?")[0];
               param = this.getPathVariable(list[i].substring(key.length), data);
            }
            list[i] = data[key] + param;
         } else if (list[i].includes("?")) {
            list[i] = this.getPathVariable(list[i], data);
         }
      }
      console.log("URL: " + `${HOST_URL}/${API_PREFIX}/${list.join("/")}`);
      return `${HOST_URL}/${API_PREFIX}/${list.join("/")}`;
   }
}