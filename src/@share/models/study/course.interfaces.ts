import { StaticImageData } from "next/image";
import { AssetModel, NameStack } from "./asset.interfaces";
import { CourseLevel, CourseTag } from "./course.enums";

export interface CourseModel extends AssetModel {
    id: number,
    modulesId: number[],
    price: number,
    nameStack: NameStack,
    totalEnrollments: number,
    totalQuestions: number,
    totalViews: number,
}


export interface CourseInfoModel {
    title: string,
    description: string,
    imgSrc: StaticImageData,
    href: string,
    level: CourseLevel,
    numOfLessons: number,
    tag: CourseTag
};
