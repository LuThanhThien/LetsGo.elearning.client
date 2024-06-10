"use client"

import React from "react";
import Carousel from "react-material-ui-carousel";
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, Grid, Stack, Typography } from "@mui/material";
import { FontSize } from "../../core/lib/style";
import { Course, CourseTagStyles } from "../../core/index.models";


export type CourseCarouselProps = {
   courses: Course[];
   cardPerSlide?: number ;
   height?: number;
}


export const CourseCard = ({ course, carouselHeight } : { course: Course, carouselHeight: number }) => {
    const card = { 
        maxWidth: 390, 
        borderRadius: 2, 
        boxShadow: 2,
        transition: "transform 0.2s ease-in-out",
        " &:hover": {
            transform: "scale3d(1.02, 1.02, 1)"
        }
    }


    const cardHeader = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: 120,
        overflow: "hidden"
    }

    const gridContainer = {
        display: "grid",
    };
    
    const gridItem = {
        margin: "1px",
        // border: "1px solid #e0e0e0",
        alignItems: "flex-end"
    };
    

    return (
        <Card sx={card}
            >
            <CardActionArea
                onClick={() => {window.location.href = course.href}}
            >
            <Stack position={"absolute"} sx={{ top: 10 }}>
                <Chip
                    label={<Typography 
                        variant="caption" 
                        sx={{ 
                            fontWeight: "bold", 
                            paddingRight: 0.5, 
                            fontSize: FontSize.small 
                        }}>{course.tag}</Typography>}
                    sx={{ 
                        backgroundColor: CourseTagStyles[course.tag].color, 
                        color: "white", 
                        fontWeight: "bold",
                        borderRadius: 2,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                />
            </Stack>
            <CardMedia
                component={"img"}
                sx={{height: 220}}
                image={course.imgSrc.src}
                alt={course.title}
                title={course.title}
            />
            <CardHeader
                title={<Typography sx={{ fontSize: FontSize.large, fontWeight: "bold" }}>{course.title}</Typography>}
                subheader={<Typography sx={{ fontSize: FontSize.small, paddingTop: 1, }}>{course.description}</Typography>}
                sx={cardHeader}
            />
            <CardContent>
                <Grid container sx={gridContainer} spacing={0.5}>
                    <Grid item sx={gridItem}>
                        <Typography variant="caption"color={"info.main"} sx={{ fontWeight: "bold" }}>
                            {`Phân loại: `}
                            <Typography variant="caption"color={"info.main"} sx={{ fontWeight: "bold" }}>{course.level}</Typography>
                        </Typography>
                    </Grid>
                    <Grid item sx={gridItem}>
                        <Typography variant="caption"color={"info.main"} sx={{ fontWeight: "bold" }}>
                            {`Số bài học: `}
                            <Typography variant="caption"color={"info.main"} sx={{ fontWeight: "bold" }}>{course.numOfLessons}</Typography>
                        </Typography>
                    </Grid>
                </Grid>
                
            </CardContent>
            </CardActionArea>
        </Card> 
    )
}


export const CourseCarousel = (({ courses, cardPerSlide = 4, height = 460 } : CourseCarouselProps) => {
    const numCardPerSlide = cardPerSlide > 0 ? cardPerSlide > 4 ? 4 : cardPerSlide : 4;
    const maxLen = courses.length;

    return (
      <Carousel height={height} animation="slide">
            {Array.from({length: Math.ceil(maxLen / numCardPerSlide)}).map((_, slideIndex) => {
                const start = slideIndex * numCardPerSlide;
                const end = start + numCardPerSlide > maxLen ? maxLen : start + numCardPerSlide;
                if (start >= maxLen) return;
                const numCard = end - start;
                console.log("start: " + start + " end: " + end)
                return (
                    <Grid container key={`slide-${slideIndex}`}
                        spacing={2} paddingTop={1}
                        height={"100%"}
                        justifyContent={numCard === cardPerSlide ? "space-around" : "flex-start"}
                        alignItems={"center"}   
                        >
                        {courses.slice(start, end).map((course, cardIndex) => {
                            return (
                                <Grid item key={`course-card-${cardIndex}`}>
                                    <CourseCard course={course} carouselHeight={height}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                )
            })}
      </Carousel>
   )
})

