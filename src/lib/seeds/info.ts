import { StaticImageData } from "next/image";
import { PRICE_INFO_BASIC1, PRICE_INFO_FREE1, PRICE_INFO_SPECIALIZE1 } from "../img";
import PriceInfo, { PriceLevel } from "../../dto/PriceInfo";

export const Contact = {
   emailTemplate: "letsgo.support@vn.com",
   phone: "091 234 5678",
   facebook: "https://www.facebook.com",
   tiktok: "https://www.tiktok.com",
   youtube: "https://www.youtube.com",
}

export type ContentValue = {
   href: string,
   child: string[]
}

export const Content : {[key: string]: {[key: string]: ContentValue}} = {
    "Về chúng tôi": {
       "Giới thiệu": {href: "/about", child: []},
       "Bảng giá": {href: "/price", child: []},
    },
    "Khóa học": {   
       "Lớp 10": {href: "/study/grade-10", child: []},
       "Lớp 11": {href: "/study/grade-11", child: []},
       "Lớp 12": {href: "/study/grade-11", child: []},
       "Ôn thi THPTQG": {href: "/study/thptqg", child: []},
    },
    "Hỗ trợ": {
       "Trung tâm hỗ trợ": {href: "/support", child: []},
       "Liên hệ:": {href: "", child: ["Email: " + Contact.emailTemplate, "Đường dây nóng: " + Contact.phone]},
    },
 }

export const Prices = [
   new PriceInfo(
      {
        type: PriceLevel.FREE,
        price: 0,
        imgSrc: PRICE_INFO_FREE1,
        checklist: [
            "Miễn phí 3 bài giảng đầu tiên trong mỗi khóa học",
            "Truy cập không giới hạn thời gian",
            "Bài tập và bài kiểm tra thử miễn phí",
            "Lời giải kèm video chi tiết",
        ]}
   ), 
   new PriceInfo(
      {
        type: PriceLevel.BASIC,
        price: 15000,
        imgSrc: PRICE_INFO_BASIC1,
        checklist: [ 
            "Miễn phí 3 bài giảng đầu tiên trong mỗi khóa học",
            "15,000VNĐ/mỗi bài giảng hoặc bộ đề sau đó",
            "Truy cập không giới hạn thời gian",
            "Bài tập và bài kiểm tra đa dạng",
            "Lời giải kèm video chi tiết",
        ]
    }
   ),
   new PriceInfo(
      {
        type: PriceLevel.SPECIALIZE,
        price: 130000,
        imgSrc: PRICE_INFO_SPECIALIZE1,
        checklist: [
            "Miễn phí 3 bài giảng đầu tiên trong mỗi khóa học",
            "130,000VNĐ/combo 10 bài giảng hoặc bộ đề bất kì",
            "Truy cập không giới hạn thời gian",
            "Bài tập và bài kiểm tra đa dạng",
            "Lời giải kèm video chi tiết",
            "Hỗ trợ tư vấn, giải đáp bài tập trực tuyến",
        ]
    }
   )
]

