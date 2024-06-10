import { EnrollmentModel } from "@/core/models/user/Enrollment";
import { RequestMethod } from "../const";
import { RestApi } from "../rest";
import { FetchResponse, StandardError, StandardResponse } from "../transactions";
import { request } from "../axios";
import { AxiosError } from "axios";

export const EnrollmentAPI = {
    ENROLLMENT: RestApi.create(RequestMethod.GET, '/enrollment'),
    LIST: RestApi.create(RequestMethod.GET, '/enrollment/list'),
    BY_ID: RestApi.create(RequestMethod.GET, '/enrollment/:enrollmentId'),
    ENROLL: RestApi.create(RequestMethod.POST, '/enroll'),
    CANCEL: RestApi.create(RequestMethod.PATCH, '/enrollment/cancel/:enrollmentId'),
}

export async function getUserEnrollments() : Promise<FetchResponse<EnrollmentModel[]>> {
    try {
        let res = await request({
            method: EnrollmentAPI.ENROLLMENT.method,
            url: EnrollmentAPI.ENROLLMENT.url,
            data: null
        })
        return StandardResponse.standlize(res).log("Get user enrollments response");
    } catch (err) {
        console.error("Get user enrollments error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get user enrollments error");
    }
}


export async function getEnrollments() : Promise<FetchResponse<EnrollmentModel[]>> {
    try {
        let res = await request({
            method: EnrollmentAPI.LIST.method,
            url: EnrollmentAPI.LIST.url,
            data: null
        })
        return StandardResponse.standlize(res).log("Get enrollments response");
    } catch (err) {
        console.error("Get enrollments error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get enrollments error");
    }

}

export async function getEnrollmentById(enrollmentId: string) : Promise<FetchResponse<EnrollmentModel>> {
    try {
       let res = await request({
          method: EnrollmentAPI.BY_ID.method,
          url: EnrollmentAPI.BY_ID.url,
          data: {enrollmentId: enrollmentId}
      })
       return StandardResponse.standlize(res).log("Get enrollment by id response");
   } catch (err) {
       console.error("Get enrollment by id error: ", err);   
       return StandardError.standlize(err as AxiosError).log("Get enrollment by id error");
   }
}


export async function enroll(id: string) : Promise<FetchResponse<EnrollmentModel>> {
    try {
        let res = await request({
            method: EnrollmentAPI.ENROLL.method,
            url: EnrollmentAPI.ENROLL.url,
            data: {id: id}
        })
        return StandardResponse.standlize(res).log("Enroll response");
    } catch (err) {
        console.error("Enroll error: ", err);
        return StandardError.standlize(err as AxiosError).log("Enroll error");
    }
}

export async function cancel(enrollmentId: string) : Promise<FetchResponse<EnrollmentModel>> {
    try {
        let res = await request({
            method: EnrollmentAPI.CANCEL.method,
            url: EnrollmentAPI.CANCEL.url,
            data: {enrollmentId: enrollmentId}
        })
        return StandardResponse.standlize(res).log("Cancel enrollment response");
    } catch (err) {
        console.error("Cancel enrollment error: ", err);
        return StandardError.standlize(err as AxiosError).log("Cancel enrollment error");
    }
}

