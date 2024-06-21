"use client";;
import { CardContent, Skeleton, Stack } from "@mui/material";
import './styles.css'
import { DefaultCard } from "@/@share/index.ui";

export default function CoursesLoading() {
    return (
        <Stack direction={"column"} spacing={1} key={"course-loading-column1"}>
        <Stack direction={"row"} spacing={1} padding={2} alignItems={"flex-start"} justifyContent={"space-between"} minHeight={"120px"} key={"course-loading-row1"}>
            <Stack direction={"column"} key="loading-left-head" spacing={1}>
                <Skeleton variant="text" width={200} height={40} key={"skeleton-text-1"}/>
                <Stack direction={"row"} spacing={1} key={"left-head-chips"}>
                    <Skeleton variant="rounded" width={50} height={20}/>
                    <Skeleton variant="rounded" width={50} height={20}/>
                    <Skeleton variant="rounded" width={50} height={20}/>
                </Stack>
            </Stack>
            <Stack direction={"column"} spacing={1} alignItems={"flex-end"} key={"course-loading-row2"}>
                <Skeleton variant="text" width={60} height={40} key={"skeleton-text-2"}/>
                <Skeleton variant="text" width={200} height={40} key={"skeleton-text-3"}/>
            </Stack>
        </Stack>
        {Array.from({length: 5}).map((_, index) => {
            return (
            <DefaultCard 
                sx={{
                ":hover": {
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                    transform: "scale3d(1.01, 1.01, 1)",
                },
                transition: "transform 0.2s ease-in-out",
                }}
                key={`course-loading-card-${index}`}
                >
                <Stack direction={"row"} spacing={1} sx={{padding: 1}}>
                <Skeleton  variant="rounded" width={300} height={180}/>
                <Stack direction={"column"} spacing={1}>
                    <CardContent>
                        <Skeleton variant="text" width={200} height={40}/>
                        <Skeleton variant="text" width={500} height={40}/>
                        <Skeleton variant="text" width={400} height={40}/>
                    </CardContent>
                </Stack>
                
                </Stack>
        </DefaultCard>
        )
        })} 
    </Stack>
    )
}