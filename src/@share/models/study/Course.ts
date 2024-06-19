import { StaticImageData } from "next/image";
import { Colors, EnumStyle } from "../../lib/style";
import { AuditData } from "../global/AuditData";
import { NameStack } from "./Asset";

export type CourseModel = {
    id: number,
    modulesId: number[],
    price: number,
    nameStack: NameStack,
}


export enum CourseLevel {
    GRADE_10 = "Lớp 10",
    GRADE_11 = "Lớp 11",
    GRADE_12 = "Lớp 12",
    THPTQG = "THPTQG",
}

export const CourseLevelStyles: Record<CourseLevel, EnumStyle> = {
    [CourseLevel.GRADE_10]: { color: Colors.primary },
    [CourseLevel.GRADE_11]: { color: Colors.secondary },
    [CourseLevel.GRADE_12]: { color: Colors.tetiary },
    [CourseLevel.THPTQG]: { color: Colors.purple },
}

export enum CourseTag {
    NEW = "Mới",
    HOT = "Hot",
    UPCOMMING = "Sắp tới",
}

export const CourseTagStyles: Record<CourseTag, EnumStyle> = {
    [CourseTag.NEW]: { color: Colors.secondary },
    [CourseTag.HOT]: { color: "red" },
    [CourseTag.UPCOMMING]: { color: Colors.tetiary },
}


export type CourseInfoType = {
    title: string,
    description: string,
    imgSrc: StaticImageData,
    href: string,
    level: CourseLevel,
    numOfLessons: number,
    tag: CourseTag
};


export class CourseInfo {
    title: string;
    description: string;
    imgSrc: StaticImageData;
    href: string;
    level: string;
    numOfLessons: number;
    tag: CourseTag;
    constructor({title, description, imgSrc, href, level, numOfLessons, tag}: CourseInfoType) {
       this.title = title;
       this.description = description;
       this.imgSrc = imgSrc;
       this.href = href;
       this.level = level;
       this.numOfLessons = numOfLessons;
       this.tag = tag;
    }
 }
 
 