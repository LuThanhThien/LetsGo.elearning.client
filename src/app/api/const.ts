
export const HOST_URL = process.env.NODE_ENV === "production" ? "xxx" : "http://localhost:8080";

export const API_PREFIX = "api/v1";

export const DEFAULT_HEADERS = {
   "Content-Type": "application/json",
}

export enum RequestMethod {
   GET = 'GET',
   POST = 'POST',
   PUT = 'PUT',
   PATCH = 'PATCH',
   DELETE = 'DELETE',   
}



