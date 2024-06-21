import { StaticImageData } from "next/image";
import { PriceInfoType } from "./price-info.interfaces";

export class PriceInfo {
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
  