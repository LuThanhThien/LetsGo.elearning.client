import { AssetModel } from "./asset.interfaces";


export interface LessonModel extends AssetModel{
    id: number,
    moduleId: number,
    dtype: string,
};

export interface AssignmentModel extends LessonModel {
    questionsId: number[],
    assignmentAttemptsId: number[],
    assignmentDuration: number,
}

export interface ReadingLessonModel extends LessonModel {
    mediaSetId: number[],
}

export interface VideoLessonModel extends LessonModel {
    mediaId: number,
}

