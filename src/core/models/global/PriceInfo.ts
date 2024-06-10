import { StaticImageData } from "next/image";
import { Colors, EnumStyle } from "../../lib/style";


export enum PriceLevel {
   FREE = "MIỄN PHÍ",
   BASIC = "CƠ BẢN",
   SPECIALIZE = "CHUYÊN SÂU",
}

export const PriceLevelStyles: Record<PriceLevel, EnumStyle> = {
   [PriceLevel.FREE]: { color: Colors.primary },
   [PriceLevel.BASIC]: { color: Colors.secondary },
   [PriceLevel.SPECIALIZE]: { color: Colors.tetiary },
}

 
export type PriceInfoType = {
   type: string,
   price: number,
   imgSrc: StaticImageData,
   checklist: string[]
 }

export class PriceInfo{
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
  