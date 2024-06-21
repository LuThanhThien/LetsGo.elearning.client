import { CourseModel } from "@/@share/index.models";
import { DefaultCard, DefaultCardProps, InfoTooltip, MuiColor } from "@/@share/index.ui"
import { 
    COURSE_THUMBNAIL1, 
    COURSE_THUMBNAIL2, 
    COURSE_THUMBNAIL3, 
    COURSE_THUMBNAIL4, 
    COURSE_THUMBNAIL5, 
    COURSE_THUMBNAIL6, 
    COURSE_THUMBNAIL7, 
    COURSE_THUMBNAIL8 
} from "@/@share/lib/image";
import { FontSize } from "@/@share/lib/style";
import { doFormatCurrency, doFormatDate, randomChoice } from "@/@share/lib/utils";
import { CardActionArea, CardContent, CardMedia, Chip, Grid, Stack, Typography } from "@mui/material";
import { BookOpenText, FileQuestion, Users, View } from "lucide-react";

export interface CourseCardProps extends DefaultCardProps {
    course: CourseModel;
}

const RandomCourseThumbnails = [
    COURSE_THUMBNAIL1,
    COURSE_THUMBNAIL2,
    COURSE_THUMBNAIL3,
    COURSE_THUMBNAIL4,
    COURSE_THUMBNAIL5,
    COURSE_THUMBNAIL6,
    COURSE_THUMBNAIL7,
    COURSE_THUMBNAIL8,
]

export const CourseCard = ({
    course,
    ...props
}: CourseCardProps) : JSX.Element => {

    function getCourseLink(course: CourseModel) {
        return `/courses/${course.id}`;
    }

    function getCourseTag(course: CourseModel) {
        const timePoint = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
        const isNew = new Date(course.createdDatetime as string).getTime() > timePoint;
        const isPopular = course.totalViews > 500;
        if (isPopular) {
            return "Phổ biến";
        }
        if (isNew) {
            return "Mới";
        }
        
        return "";
    }

    const CourseData = ({
        data,
        title,
        icon
    }: {
        data: any;
        title: string;
        icon?: JSX.Element;
    }) => {
        return (
            <InfoTooltip
                title={title}
            >
                <Stack direction={"row"} spacing={1} justifyContent={"center"} alignItems={"center"}>
                    {icon}
                    <Typography fontWeight={"bold"} variant={"body2"}>{data}</Typography>
                </Stack>
            </InfoTooltip>
        )
    }

    return (
        <DefaultCard 
            sx={{
                ":hover": {
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                    transform: "scale3d(1.01, 1.01, 1)"
                },
                transition: "transform 0.2s ease-in-out",
            }}
            {...props}>
            <CardActionArea
                onClick={() => {window.location.href = getCourseLink(course)}}
            >
                <Stack direction={"row"}>
                    <CardMedia
                        sx={{
                            height: "200px",
                            width: "300px",
                            ":hover": {
                                cursor: "pointer",
                            }
                        }}
                        component="img"
                        image={randomChoice(...RandomCourseThumbnails).src}
                        alt={course.name}
                    />
                    <Stack direction={"column"}>
                        <Stack direction={"row"}>
                            <CardContent sx={{width: "100%"}}>
                                <Stack direction={"column"} spacing={0.5}>
                                    <Typography fontWeight={"bold"} variant={"h6"}>{course.name}</Typography>
                                    <Typography variant={"caption"}>Cập nhật lần cuối: {doFormatDate(course.lastModifiedDatetime || course.createdDatetime)}</Typography>
                                    <Typography variant="subtitle2">{course.description}</Typography>
                                </Stack>
                            </CardContent>
                            <CardContent 
                                sx={{
                                    paddingTop: 3,
                                    paddingRight: 4,
                                }}  
                            >
                                <Typography fontWeight={"bold"} fontSize={FontSize.large}>{doFormatCurrency(course.price)}</Typography>
                            </CardContent>
                        </Stack>
                        <CardContent sx={{ 
                            height: "100%", 
                            alignContent: "flex-end", 
                            }}>
                            <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
                                <Stack direction={"row"} spacing={3}>
                                    <CourseData icon={<Users size={15}/>} data={course.modulesId.length} title={"Số lượng bài học"}/>
                                    <CourseData icon={<BookOpenText size={15}/>} data={course.totalEnrollments} title={"Số lượng học viên"}/>
                                    <CourseData icon={<FileQuestion size={15}/>} data={course.totalQuestions} title={"Số lượng câu hỏi"}/>
                                    <CourseData icon={<View size={15}/>} data={course.totalViews} title={"Lượt xem"}/>
                                </Stack>
                                <Stack direction={"row"} spacing={1}>
                                    {getCourseTag(course) !=="" && <Chip variant="filled" label={getCourseTag(course)} sx={{ backgroundColor: MuiColor({transparency: 80}).info, color: MuiColor({transparency: 0}).info }}/>}
                                    {course.price === 0 && <Chip variant="filled" label={"Miễn phí"} sx={{ backgroundColor: MuiColor({transparency: 80}).success, color: MuiColor({transparency: 0}).success }}/>}
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Stack>
                </Stack>
            </CardActionArea>
            
        </DefaultCard>
    )
}