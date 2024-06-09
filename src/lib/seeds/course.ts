import Course, { CourseLevel, CourseTag } from "@/dto/Course"
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
} from "@/lib/img"

export const MainCourses = [
   new Course ({
        title: "Ôn thi THPT",
        description: "Ngân hàng bộ đề và bài tập trắc nghiệm (đáp án, video lời giải chi tiết)",
        imgSrc: DEFAULT_THPTQG_THUMBNAIL1,
        href: "/study/thptqg",
        level: CourseLevel.THPTQG,
        numOfLessons: 0,
        tag: CourseTag.NEW,
    }),
    new Course ({
        title: "Toán Lớp 10",
        description: "Học Toán lớp 10 với các bài giảng chất lượng về Đại Số, Hàm số",
        imgSrc: DEFAULT_GRADE10_THUMBNAIL1,
        href: "/study/grade-10",
        level: CourseLevel.GRADE_10,
        numOfLessons: 0,
        tag: CourseTag.UPCOMMING,
    }),
    new Course ({
        title: "Toán Lớp 11",
        description: "Học Toán lớp 10 với các bài giảng chất lượng về Xác suất thống kê, Lượng giác",
        imgSrc: DEFAULT_GRADE11_THUMBNAIL1,
        href: "/study/grade-11",
        level: CourseLevel.GRADE_11,
        numOfLessons: 0,
        tag: CourseTag.UPCOMMING,
    }),
    new Course ({
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
  new Course ({
      title: "Đề thi chính thức Toán THPTQG",
      description: "Tổng hợp các đề thi chính thức Toán THPTQG những năm gần đây (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL2,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 20,
      tag: CourseTag.HOT,
  }),
   new Course ({
      title: "Đề thi thử Toán THPTQG",
      description: "Tổng hợp đề thi thử Toán từ các trường THPT qua các năm (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL1,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 10,
      tag: CourseTag.HOT,
    }),
    new Course ({
      title: "Lượng giác",
      description: "Ngân hàng câu hỏi trắc nghiệm về Lượng giác (đáp án, video lời giải chi tiết)",  
      imgSrc: PATTERN_THUMBNAIL3,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 10,
      tag: CourseTag.UPCOMMING,
    }),
    new Course({
      title: "Đại số",
      description: "Ngân hàng câu hỏi trắc nghiệm về Đại số (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL4,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 30,
      tag: CourseTag.UPCOMMING,
  }),
  new Course({
      title: "Hình học",
      description: "Ngân hàng câu hỏi trắc nghiệm về Hình học (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL5,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 10,
      tag: CourseTag.UPCOMMING,
  }),
  new Course({
      title: "Xác xuất và thống kê",
      description: "Ngân hàng câu hỏi trắc nghiệm về Xác xuất và thống kê (đáp án, video lời giải chi tiết)",
      imgSrc: PATTERN_THUMBNAIL1,
      href: "/study/thptqg",
      level: CourseLevel.THPTQG,
      numOfLessons: 10,
      tag: CourseTag.UPCOMMING,
  }),
  new Course ({
    title: "Giải tích nâng cao",
    description: "Ngân hàng câu hỏi trắc nghiệm về Giải tích nâng cao (đáp án, video lời giải chi tiết)",
    imgSrc: PATTERN_THUMBNAIL2,
    href: "/study/thptqg",
    level: CourseLevel.THPTQG,
    numOfLessons: 20,
    tag: CourseTag.HOT,
}),
 new Course ({
    title: "Hình học không gian",
    description: "Ngân hàng câu hỏi trắc nghiệm về Hình học không gian (đáp án, video lời giải chi tiết)",
    imgSrc: PATTERN_THUMBNAIL3,
    href: "/study/thptqg",
    level: CourseLevel.THPTQG,
    numOfLessons: 10,
    tag: CourseTag.HOT,
  }),
]