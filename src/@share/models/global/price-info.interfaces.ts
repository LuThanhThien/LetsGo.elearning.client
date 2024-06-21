import { StaticImageData } from "next/image"

export interface PriceInfoType {
    type: string,
    price: number,
    imgSrc: StaticImageData,
    checklist: string[]
  }
 