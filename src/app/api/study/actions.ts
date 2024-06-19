import { AxiosError } from "axios";
import { request } from "../axios";
import { RequestMethod } from "../const";
import { RestApi } from "../rest";
import { FetchResponse, StandardError, StandardResponse } from "../transactions";
import { 
    QuestionModel,
    LessonModel,
    ModuleModel,
    CourseModel
 } from "@/@share/index.models";



export const StudyApi = {
    LIST_COURSE: RestApi.create(RequestMethod.GET, '/study/course'),
    COURSE_BY_ID: RestApi.create(RequestMethod.GET, '/study/course/:courseId'),
    UPDATE_COURSE: RestApi.create(RequestMethod.PATCH, '/study/course'),
    MODULE_BY_COURSE_ID: RestApi.create(RequestMethod.GET, '/study/course/:courseId/module'),
    LIST_MODULE: RestApi.create(RequestMethod.GET, '/study/module'),
    MODULE_BY_ID: RestApi.create(RequestMethod.GET, '/study/module/:moduleId'),
    UPDATE_MODULE: RestApi.create(RequestMethod.PATCH, '/study/module'),
    LESSON_BY_MODULE_ID: RestApi.create(RequestMethod.GET, '/study/module/:moduleId/lesson'),
    LIST_LESSON: RestApi.create(RequestMethod.GET, '/study/lesson'),
    LESSON_BY_ID: RestApi.create(RequestMethod.GET, '/study/lesson/:lessonId'),
    UPDATE_LESSON: RestApi.create(RequestMethod.PATCH, '/study/lesson'),
    QUESTION_BY_ASSIGNMENT_ID: RestApi.create(RequestMethod.GET, '/study/assignment/:assignmentId/question'),
    UPDATE_QUESTION: RestApi.create(RequestMethod.GET, '/study/question'),
};

export async function getCourseList() : Promise<FetchResponse<CourseModel[]>> {
    try {
        let res = await request({
            method: StudyApi.LIST_COURSE.method,
            url: StudyApi.LIST_COURSE.url,
            data: null
        })
        return StandardResponse.standlize(res).log("Get course list response");
    } catch (err) {
        console.error("Get course list error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get course list error");
    }
}


export async function getCourseById(courseId: string) : Promise<FetchResponse<CourseModel>> {
    try {
        let res = await request({
            method: StudyApi.COURSE_BY_ID.method,
            url: StudyApi.COURSE_BY_ID.url,
            data: {courseId: courseId}
        })
        return StandardResponse.standlize(res).log("Get course by id response");
    } catch (err) {
        console.error("Get course by id error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get course by id error");
    }
}

export async function updateCourse(course: CourseModel) : Promise<FetchResponse<CourseModel>> {
    try {
        let res = await request({
            method: StudyApi.UPDATE_COURSE.method,
            url: StudyApi.UPDATE_COURSE.url,
            data: course
        })
        return StandardResponse.standlize(res).log("Update course response");
    } catch (err) {
        console.error("Update course error: ", err);
        return StandardError.standlize(err as AxiosError).log("Update course error");
    }
}

export async function getModuleByCourseId(courseId: string) : Promise<FetchResponse<ModuleModel[]>> {
    try {
        let res = await request({
            method: StudyApi.MODULE_BY_COURSE_ID.method,
            url: StudyApi.MODULE_BY_COURSE_ID.url,
            data: {courseId: courseId}
        })
        return StandardResponse.standlize(res).log("Get module by course id response");
    } catch (err) {
        console.error("Get module by course id error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get module by course id error");
    }
}

export async function getModuleList() : Promise<FetchResponse<ModuleModel[]>> {
    try {
        let res = await request({
            method: StudyApi.LIST_MODULE.method,
            url: StudyApi.LIST_MODULE.url,
            data: null
        })
        return StandardResponse.standlize(res).log("Get module list response");
    } catch (err) {
        console.error("Get module list error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get module list error");
    }
}

export async function getModuleById(moduleId: string) : Promise<FetchResponse<ModuleModel>> {
    try {
        let res = await request({
            method: StudyApi.MODULE_BY_ID.method,
            url: StudyApi.MODULE_BY_ID.url,
            data: {moduleId: moduleId}
        })
        return StandardResponse.standlize(res).log("Get module by id response");
    } catch (err) {
        console.error("Get module by id error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get module by id error");
    }
}

export async function updateModule(module: ModuleModel) : Promise<FetchResponse<ModuleModel>> {
    try {
        let res = await request({
            method: StudyApi.UPDATE_MODULE.method,
            url: StudyApi.UPDATE_MODULE.url,
            data: module
        })
        return StandardResponse.standlize(res).log("Update module response");
    } catch (err) {
        console.error("Update module error: ", err);
        return StandardError.standlize(err as AxiosError).log("Update module error");
    }
}

export async function getLessonByModuleId(moduleId: string) : Promise<FetchResponse<LessonModel[]>> {
    try {
        let res = await request({
            method: StudyApi.LESSON_BY_MODULE_ID.method,
            url: StudyApi.LESSON_BY_MODULE_ID.url,
            data: {moduleId: moduleId}
        })
        return StandardResponse.standlize(res).log("Get lesson by module id response");
    } catch (err) {
        console.error("Get lesson by module id error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get lesson by module id error");
    }
}

export async function getLessonList() : Promise<FetchResponse<LessonModel[]>> {
    try {
        let res = await request({
            method: StudyApi.LIST_LESSON.method,
            url: StudyApi.LIST_LESSON.url,
            data: null
        })
        return StandardResponse.standlize(res).log("Get lesson list response");
    } catch (err) {
        console.error("Get lesson list error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get lesson list error");
    }
}

export async function getLessonById(lessonId: string) : Promise<FetchResponse<LessonModel>> {
    try {
        let res = await request({
            method: StudyApi.LESSON_BY_ID.method,
            url: StudyApi.LESSON_BY_ID.url,
            data: {lessonId: lessonId}
        })
        return StandardResponse.standlize(res).log("Get lesson by id response");
    } catch (err) {
        console.error("Get lesson by id error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get lesson by id error");
    }
}

export async function updateLesson(lesson: LessonModel) : Promise<FetchResponse<LessonModel>> {
    try {
        let res = await request({
            method: StudyApi.UPDATE_LESSON.method,
            url: StudyApi.UPDATE_LESSON.url,
            data: lesson
        })
        return StandardResponse.standlize(res).log("Update lesson response");
    } catch (err) {
        console.error("Update lesson error: ", err);
        return StandardError.standlize(err as AxiosError).log("Update lesson error");
    }
}

export async function getQuestionByAssignmentId(assignmentId: string) : Promise<FetchResponse<QuestionModel[]>> {
    try {
        let res = await request({
            method: StudyApi.QUESTION_BY_ASSIGNMENT_ID.method,
            url: StudyApi.QUESTION_BY_ASSIGNMENT_ID.url,
            data: {assignmentId: assignmentId}
        })
        return StandardResponse.standlize(res).log("Get question by assignment id response");
    } catch (err) {
        console.error("Get question by assignment id error: ", err);
        return StandardError.standlize(err as AxiosError).log("Get question by assignment id error");
    }
}

export async function updateQuestion(question: QuestionModel) : Promise<FetchResponse<QuestionModel>> {
    try {
        let res = await request({
            method: StudyApi.UPDATE_QUESTION.method,
            url: StudyApi.UPDATE_QUESTION.url,
            data: question
        })
        return StandardResponse.standlize(res).log("Update question response");
    } catch (err) {
        console.error("Update question error: ", err);
        return StandardError.standlize(err as AxiosError).log("Update question error");
    }
}

