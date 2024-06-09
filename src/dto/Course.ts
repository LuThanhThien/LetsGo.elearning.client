import { StaticImageData } from "next/image";
import { Colors } from "../lib/styles";


export enum CourseLevel {
    GRADE_10 = "Lớp 10",
    GRADE_11 = "Lớp 11",
    GRADE_12 = "Lớp 12",
    THPTQG = "THPTQG",
  }
  
export enum CourseTag {
    NEW = "Mới",
    HOT = "Hot",
    UPCOMMING = "Sắp tới",
}

export const CourseTagColor = {
    "Mới": Colors.secondary,
    "Hot": "red",
    "Sắp tới": Colors.tetiary,
}

export type CourseType = {
    title: string,
    description: string,
    imgSrc: StaticImageData,
    href: string,
    level: CourseLevel,
    numOfLessons: number,
    tag: CourseTag
}

export default class Course {
    title: string;
    description: string;
    imgSrc: StaticImageData;
    href: string;
    level: string;
    numOfLessons: number;
    tag: CourseTag;
    constructor({title, description, imgSrc, href, level, numOfLessons, tag}: CourseType) {
       this.title = title;
       this.description = description;
       this.imgSrc = imgSrc;
       this.href = href;
       this.level = level;
       this.numOfLessons = numOfLessons;
       this.tag = tag;
    }
 }
 
 