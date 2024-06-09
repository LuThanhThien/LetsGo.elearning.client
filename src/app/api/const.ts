import { Role } from "@/dto/Auth";

export const HOST_URL = 
   process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";

export const DEFAULT_HEADERS = {
   "Content-Type": "application/json",
}

export const ACCESS_TOKEN_KEY = "jwt_access_token";
export const REFRESH_TOKEN_KEY = "jwt_refresh_token";

export enum RequestMethod {
   GET = 'GET',
   POST = 'POST',
   PUT = 'PUT',
   PATCH = 'PATCH',
   DELETE = 'DELETE',   
}

export const AuthAPI = {
   AUTH: '/api/auth',
   LOGIN: '/api/auth/login',
   REGISTER: '/api/auth/register',
   LOGOUT: '/api/auth/logout',
   FIND_USER: '/api/auth/find-user',
}

export const AdminAPI = {
   ADMIN: '/api/admin',
   HOME: '/api/admin/home',
   LIST_USER: '/api/admin/list-user',
   NUM_USER: '/api/admin/num-user',
}

export const UserAPI = {
   USER: '/api/user',
   CHANGE_PASSWORD: '/api/user/password',
   TOTAL_MODULES: '/api/user/enrollment/total-modules',
   PAYMENT: '/api/user/payment',
   ENROLLMENT: '/api/user/enrollment',
}

export const EnrollmentAPI = {
   ENROLLMENT: '/api/enrollment',
}

export enum SearchModel {
   User = '/api/user',
   Enrollment = '/api/enrollment',  
}

export const SearchAPI = (api: string, searchType: SearchType, queryParams: any) => {
   let queryString = "";
   if (searchType === SearchType.KEYWORD) {
      queryString = `?keyword=${queryParams}`;
   } else {
      queryString = Object.keys(queryParams).map(key => {
         return `${key}=${queryParams[key]}`;
      }).join("&");
   }
   return api + `/${searchType}?` + queryString;
}

export enum SearchType {
   KEYWORD = "search-keyword",
   AND = "search-and",
   OR = "search-or",
}

export class AuthorityPatterProvider  {
   pattern: string;
   roles: Role[];

   constructor(pattern: string, roles: Role[]) {
      this.pattern = pattern;
      this.roles = roles;
   }
}

export const AuthorityPatterns = [
   new AuthorityPatterProvider("/admin/closet/*", [Role.ADMIN]),
   new AuthorityPatterProvider("/admin/*", [Role.ADMIN, Role.CONTRIBUTOR]),
   new AuthorityPatterProvider("/user/*", [Role.USER, Role.ADMIN, Role.CONTRIBUTOR]),
]