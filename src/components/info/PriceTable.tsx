"use client"

import React from "react";
import { cn } from "@/core/lib/utils";
import { PriceInfoType, PriceLevel } from "@/core/index.models";
import Image from "next/image";

type PriceCardProps = {
   className?: string;
   price: PriceInfoType;
};

export const PriceCard = React.forwardRef<
   HTMLDivElement,
   PriceCardProps
>(({ className, price },  ref) => {

   const priceToString = (price : number) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

   const topType = price.type === PriceLevel.BASIC ? "top-type" : ""
   const topPriceCard = price.type === PriceLevel.BASIC ? "top-price-card" : ""

   return(
      <div id="price-card" className={cn("price-card", topPriceCard, className)} ref={ref}>
         <div className={cn('top-normal', topType)}></div>
         <h1 className="price-type">{price.type}</h1>
         <div className="price-card-header">
            <Image src={price.imgSrc} alt="price-card"/>
            <div className="flex">
               <div className="flex title">{priceToString(price.price)}</div>
               <h1><sub>₫</sub></h1>
            </div>
         </div>
         <div className="price-card-content">
            {price.checklist.map((feature, index) => (
               <p key={index}>{feature}</p>
            ))}
         </div>
      </div>
   )
})

export type PriceTableProps = {
   className?: string;
   prices: PriceInfoType[];
}

export const PriceTable = React.forwardRef<
   HTMLDivElement,
   PriceTableProps
>(({ className, prices },  ref) => {
   return (
      <div id="price-table" className={cn("price-table", className)} ref={ref} >
         <div className="price-table-header">
         </div>
         <div className="price-table-card">
            {prices.map((price, index) => (
               <PriceCard key={index} price={price}/>
            ))}
         </div>
      </div>
   )
})
