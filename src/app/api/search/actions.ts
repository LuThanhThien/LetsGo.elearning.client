
import { AxiosError } from "axios";
import { request } from "../axios";
import { RequestMethod, SearchAPI, SearchModel, SearchType } from "../const";
import { FetchResponse, StandardError, StandardResponse } from "../transactions";

export async function search(searchModel: SearchModel, searchType: SearchType, queryParams: any) : Promise<FetchResponse<any>> {
   console.log("Search search Model: ", searchModel);
   console.log("Search queryParams: ", queryParams);
   try {
        let result = await request({
            method: RequestMethod.GET,
            url: SearchAPI(searchModel, searchType, queryParams),
            data: null,
        })
        return StandardResponse.standlize(result).log("Search response");
   } catch (err) {
        return StandardError.standlize(err as AxiosError).log("Search error");
   }
}

export async function searchKeyword(
   searchModel: SearchModel, 
   keyword: string) : Promise<FetchResponse<any>>{
   return await search(searchModel, SearchType.KEYWORD, keyword);
}

export async function searchOr(
   searchModel: SearchModel, 
   queryParams: any) : Promise<FetchResponse<any>> {
   return await search(searchModel, SearchType.OR, queryParams);
}

export async function searchAnd(
   searchModel: SearchModel, 
   queryParams: any) : Promise<FetchResponse<any>> {
    return await search(searchModel, SearchType.AND, queryParams);
 }