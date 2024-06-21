import { Colors, EnumStyle } from "../../lib/style";


export enum CourseLevel {
    GRADE_10 = "Lớp 10",
    GRADE_11 = "Lớp 11",
    GRADE_12 = "Lớp 12",
    THPTQG = "THPTQG",
}

export const CourseLevelStyles: Record<CourseLevel, EnumStyle> = {
    [CourseLevel.GRADE_10]: { color: Colors.primary },
    [CourseLevel.GRADE_11]: { color: Colors.secondary },
    [CourseLevel.GRADE_12]: { color: Colors.tetiary },
    [CourseLevel.THPTQG]: { color: Colors.purple },
}

export enum CourseTag {
    NEW = "Mới",
    HOT = "Hot",
    UPCOMMING = "Sắp tới",
}

export const CourseTagStyles: Record<CourseTag, EnumStyle> = {
    [CourseTag.NEW]: { color: Colors.secondary },
    [CourseTag.HOT]: { color: "red" },
    [CourseTag.UPCOMMING]: { color: Colors.tetiary },
}

