import { StaticImageData } from "next/image";


export enum PriceLevel {
    FREE = "MIỄN PHÍ",
    BASIC = "CƠ BẢN",
    SPECIALIZE = "CHUYÊN SÂU",
 }
 
 
export type PriceInfoType = {
     type: string,
     price: number,
     imgSrc: StaticImageData,
     checklist: string[]
     
 }
 
 export default class PriceInfo{
     type: string;
     price: number;
     imgSrc: StaticImageData;
     checklist: string[];
     
     constructor({type, price, imgSrc, checklist} : PriceInfoType) {
        this.type = type;
        this.imgSrc = imgSrc;
        this.price = price;
        this.checklist = checklist;
     }
  }
  