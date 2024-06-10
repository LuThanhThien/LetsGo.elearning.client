import { AssetModel } from "./Asset";


export type LessonModel = {
    id: number,
    moduleId: number,
    dtype: string,
} & AssetModel;

export type AssignmentModel = {
    questionsId: number[],
    assignmentAttemptsId: number[],
    assignmentDuration: number,
} & LessonModel;

export type ReadingLessonModel = {
    mediaSetId: number[],
} & LessonModel;

export type VideoLessonModel = {
    mediaId: number,
} & LessonModel;

