import { CourseInfo, CourseLevel, CourseTag } from "@/@share/index.models"
import { 
  DEFAULT_GRADE10_THUMBNAIL1, 
  DEFAULT_GRADE11_THUMBNAIL1, 
  DEFAULT_GRADE12_THUMBNAIL1, 
  DEFAULT_THPTQG_THUMBNAIL1, 
  PATTERN_THUMBNAIL1,
  PATTERN_THUMBNAIL2,
  PATTERN_THUMBNAIL3,
  PATTERN_THUMBNAIL4,
  PATTERN_THUMBNAIL5
} from "@/@share/lib/image"

export const MainCourses = [
   new CourseInfo ({
        title: "Ôn thi THPT",
        description: "Ngân hàng bộ đề và bài tập trắc nghiệm (đáp án, video lời giải chi tiết)",
        imgSrc: DEFAULT_THPTQG_THUMBNAIL1,
        href: "/study/thptqg",
        level: CourseLevel.THPTQG,
        numOfLessons: 0,
        tag: CourseTag.NEW,
    }),
    new CourseInfo ({
        title: "Toán Lớp 10",
        description: "Học Toán lớp 10 với các bài giảng chất lượng về Đại Số, Hàm số",
        imgSrc: DEFAULT_GRADE10_THUMBNAIL1,
        href: "/study/grade-10",
        level: CourseLevel.GRADE_10,
        numOfLessons: 0,
        tag: CourseTag.UPCOMMING,
    }),
    new CourseInfo ({
        title: "Toán Lớp 11",
        description: "Học Toán lớp 10 với các bài giảng chất lượng về Xác suất thống kê, Lượng giác",
        imgSrc: DEFAULT_GRADE11_THUMBNAIL1,
        href: "/study/grade-11",
        level: CourseLevel.GRADE_11,
        numOfLessons: 0,
        tag: CourseTag.UPCOMMING,
    }),
    new CourseInfo ({
        title: "Toán Lớp 12",
        description: "Học Toán lớp 10 với các bài giảng chất lượng về Hình học, Giải tích",
        imgSrc: DEFAULT_GRADE12_THUMBNAIL1,
        href: "/study/grade-12",
        level: CourseLevel.GRADE_12,
        numOfLessons: 0,
        tag: CourseTag.UPCOMMING,
    }),
]

export const CurrentCourses = [
  new CourseInfo ({
      title: "Đề thi chính thức Toán THPTQG",
      description: "Tổng hợp các đề thi chính thức Toán THPTQG những năm gần đây (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL2,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 20,
      tag: CourseTag.HOT,
  }),
   new CourseInfo ({
      title: "Đề thi thử Toán THPTQG",
      description: "Tổng hợp đề thi thử Toán từ các trường THPT qua các năm (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL1,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 10,
      tag: CourseTag.HOT,
    }),
    new CourseInfo ({
      title: "Lượng giác",
      description: "Ngân hàng câu hỏi trắc nghiệm về Lượng giác (đáp án, video lời giải chi tiết)",  
      imgSrc: PATTERN_THUMBNAIL3,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 10,
      tag: CourseTag.UPCOMMING,
    }),
    new CourseInfo({
      title: "Đại số",
      description: "Ngân hàng câu hỏi trắc nghiệm về Đại số (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL4,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 30,
      tag: CourseTag.UPCOMMING,
  }),
  new CourseInfo({
      title: "Hình học",
      description: "Ngân hàng câu hỏi trắc nghiệm về Hình học (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL5,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 10,
      tag: CourseTag.UPCOMMING,
  }),
  new CourseInfo({
      title: "Xác xuất và thống kê",
      description: "Ngân hàng câu hỏi trắc nghiệm về Xác xuất và thống kê (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL1,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 10,
      tag: CourseTag.UPCOMMING,
  }),
  new CourseInfo ({
    title: "Giải tích nâng cao",
    description: "Ngân hàng câu hỏi trắc nghiệm về Giải tích nâng cao (đáp án, video lời giải chi tiết)",
    imgSrc: PATTERN_THUMBNAIL2,
    href: "/study/thptqg",
    level: CourseLevel.THPTQG,
    numOfLessons: 20,
    tag: CourseTag.HOT,
}),
 new CourseInfo ({
    title: "Hình học không gian",
    description: "Ngân hàng câu hỏi trắc nghiệm về Hình học không gian (đáp án, video lời giải chi tiết)",
    imgSrc: PATTERN_THUMBNAIL3,
    href: "/study/thptqg",
    level: CourseLevel.THPTQG,
    numOfLessons: 10,
    tag: CourseTag.HOT,
  }),
]


export const CourseTopics = [
  "Đề thi thử",
  "Đề thi chính thức",
  "Từ vựng",
  "Ngữ pháp",
  "Đọc hiểu",
]

export const CourseSortBy = [
  "Mới nhất",
  "Số học viên",
  "Số lượt xem",
]

export const CourseFilters = {
  "Chủ đề": CourseTopics,
  "Cấp độ": Object.values(CourseLevel),
  "Nhãn": Object.values(CourseTag),
}

