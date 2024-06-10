"use client"

import { SquareUserRound, TelescopeIcon, Zap } from "lucide-react";
import { CurrentCourses, MainCourses } from "../seeds/course";
import React from "react";
import { useSession } from "next-auth/react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Loading from "./loading";
import { TOP_BANNER } from "../core/lib/image";
import { DefaultButton } from "../core/index.ui";
import { CourseCarousel } from "../components/index.component";
import { Colors, FontSize } from "../core/lib/style";


export default function Home() {
  const [explore, setExplore] = React.useState(false);
  const {data: session, status } = useSession();

  const currentCourseId = 'current-course'
  const upcommingCourseId = 'upcomming-course'
  const priceTableId = "price-table"
  console.log({ session })

  // Function to handle button click
  const handleExplore = () => {
    // Set the state to true when the button is clicked
    setExplore(true);

    // Scroll to the next part using smooth behavior
    const exploreSection = document.getElementById(currentCourseId);
    if (exploreSection) {
      // Calculate the target position with an offset
      const offset = 50; // Adjust this value as needed
      const targetPosition = exploreSection.offsetTop - offset;
      console.log("exploreSection.offsetTop: " + exploreSection.offsetTop)
      console.log("targetPosition: " + targetPosition)

      // Scroll to the target position with smooth behavior
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

 

  if (status === "loading") return <Loading/>

  return (
    <Grid container direction={"column"} spacing={10} sx={{ padding: 10 }}>
      <Grid item>
        <Box>
          <Stack direction={"row"} spacing={2}>
            <Image width={700} src={TOP_BANNER} priority alt="top-banner"/>
            <Grid container direction="column"  paddingLeft={5}>
              <Grid item xs={5} paddingTop={5} alignContent={"center"}>
                <Typography sx={{ fontWeight: "bold", fontSize: FontSize.mega }}>
                    Nền tảng học trực tuyến <br/> môn <span style={{ color: Colors.secondary }}>Toán THPT</span>
                  </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ fontSize: FontSize.large }}>
                  <span className="font-bold" style={{color: Colors.secondary, fontWeight: "bold"}}>Let's Go</span> là nền tảng học và luyện thi trực tuyến môn Toán dành cho <span className="font-bold" style={{color: Colors.secondary, fontWeight: "bold"}}>học sinh THPT</span>. Đăng ký ngay để truy cập những tài nguyên học tập miễn phí!
                </Typography>
              </Grid>
              <Grid item xs={2} alignItems={"flex-start"} justifyContent={"flex-start"}>
                {
                  session 
                  ? 
                  <Stack direction={"row"} spacing={2}>
                    <DefaultButton maxWidth="230px" id="join-button" href="/user/profile/general" startIcon={<SquareUserRound/>}>Trang cá nhân</DefaultButton>
                    <DefaultButton id="explore-button" maxWidth="200px" variant="contained" color="info" startIcon={<TelescopeIcon/>} onClick={handleExplore}>Khám phá</DefaultButton>
                  </Stack>
                  :
                  <Grid container direction={"row"} spacing={2} justifyContent={"flex-start"} alignItems={"flex-start"}>
                    <Grid item xs={3.7}>
                      <DefaultButton id="join-button" href="/login" startIcon={<Zap/>}>Tham gia</DefaultButton>
                    </Grid>
                    <Grid item xs={4}>
                      <DefaultButton id="explore-button" variant="contained" color="info" startIcon={<TelescopeIcon/>} onClick={handleExplore}>Tìm hiểu ngay</DefaultButton>
                    </Grid>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Grid>
      <Grid item>
        <Box id={`${currentCourseId}`}>
          <Grid container direction={"row"} spacing={5}>
            <Grid item xs={12}  alignItems={"center"} justifyItems={"center"}>
              <Typography sx={{ fontSize: FontSize.extra, fontWeight: "bold" }}>Luyện thi Toán THPTQG</Typography>
            </Grid>
            <Grid item xs={12}>
              <CourseCarousel courses={CurrentCourses}/>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box id={`${upcommingCourseId}`}>
          <Grid container direction={"column"} spacing={5}>
            <Grid item>
              <Typography sx={{ fontSize: FontSize.extra, fontWeight: "bold" }}>Các khóa học tiêu biểu</Typography>
            </Grid>
            <Grid item>
              <CourseCarousel courses={MainCourses}/>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        {/* <div id={`price-${priceTableId}`}>
            <div className="subtitle home-title price-title">Bảng giá cho các bài giảng</div>
          <PriceTable prices={Prices}/>
        </div> */}
      </Grid>
    </Grid>            
  );
}
