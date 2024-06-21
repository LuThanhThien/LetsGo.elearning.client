import { StaticImageData } from "next/image";
import { CourseLevel, CourseTag } from "./course.enums";
import { CourseInfoModel } from "./course.interfaces";


export class CourseInfo implements CourseInfoModel {
    title: string;
    description: string;
    imgSrc: StaticImageData;
    href: string;
    level: CourseLevel;
    numOfLessons: number;
    tag: CourseTag;

    constructor({title, description, imgSrc, href, level, numOfLessons, tag}: CourseInfoModel) {
       this.title = title;
       this.description = description;
       this.imgSrc = imgSrc;
       this.href = href;
       this.level = level;
       this.numOfLessons = numOfLessons;
       this.tag = tag;
    }
 }
 
 