"use client"
import { BackgroundContainer, LayoutContainer, MainContainer } from "@/components/index.component";
import { Box, CardContent, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Stack, Typography } from "@mui/material";
import './styles.css'
import theme from "@/theme";
import { ControlledSelect, DefaultButton, DefaultCard, DefaultChip, SearchField, TextButton } from "@/@share/index.ui";
import { CourseFilters, CourseSortBy, CourseTopics } from "@/seeds/course";
import { useEffect, useState } from "react";
import { getCourseList } from "@/app/api/index.api";
import { toast } from "sonner";
import { CourseModel } from "@/@share/index.models";
import { CourseSearchDto, CourseSearchSchema } from "@/@share/index.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Colors, FontSize } from "@/@share/lib/style";
import { set } from "zod";

export default function Courses() {
   const [courses, setCourses] = useState<CourseModel[]>([]);
   const [searchValue, setSearchValue] = useState("");
   const [filters, setFilters] = useState<{ [key: string]: boolean }>({});
   const courseSearchForm = useForm<CourseSearchDto>({
      resolver: zodResolver(CourseSearchSchema),
    });

   async function handleSearchCourses(value: string, filters: any) {
      console.log("Filters: ", filters);  
      const res = await getCourseList();
      if (res.error) {
         toast.error("Lỗi hệ thống");
         return;
      }
      setCourses(res.data);
   }

   function handleOnSearch(value: string) {
      console.log("Search for: ", value);
      setSearchValue(value);
   }

   function handleFilterChange(filter: string, event: React.ChangeEvent<HTMLInputElement>) {
      console.warn("[filter]: [event.target.checked] ", filter, event.target.checked)
      setFilters({
         ...filters,
         [filter]: event.target.checked
      })
   }

   function handleDeleteAllFilters() {
      setFilters({});
   }

   useEffect(() => {
      handleSearchCourses(searchValue, filters);
   }, [searchValue, filters])
    
   return (
   <LayoutContainer>
      <BackgroundContainer
         className="background-header"
         alignItems={"center"}
         justifyContent={"center"}
         justifyItems={"center"}
      >
         <Grid container direction={"row"} alignItems={"flex-start"}>
               <Grid item xs={6} paddingLeft={15}>
                  <Typography 
                     color={theme.palette.common.white}
                     variant={"h3"}
                     fontWeight={"bold"}
                  >Tất cả khóa học</Typography>
               </Grid>
         </Grid>
      </BackgroundContainer>
      <MainContainer
         backgroundProps={{
            paddingTop: 3,
            paddingBottom: 3,
            // sx: {
            //    backgroundColor: Colors.shadowLighten
            // }  
         }}
      >
         <Stack direction={"row"} spacing={4} width={"100%"}>
            <Grid item>
               <DefaultCard
               id={"filter-card"}
               sx={{
                  width: "300px",
               }}
               >
                  <CardContent>
                     <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                           <SearchField
                              InputProps={{
                                 sx: { height: "50px",}
                              }}
                              onSearch={(value) => handleOnSearch(value)}
                           />
                        </Grid>
                        <Grid item >
                           <Stack direction={"column"} spacing={2} paddingLeft={1}>
                              <Typography fontWeight={"bold"} variant="h6">Bộ lọc</Typography>
                              {Object.entries(CourseFilters).map(([key, values] , index) => {
                                 return (
                                 <Stack direction={"column"} key={`filter-${index}`}>
                                    <Divider/>
                                    <Box sx={{ m: 1 }}/>
                                    <Typography fontWeight={"bold"} paddingLeft={1} paddingBottom={1}>{key}</Typography>
                                    <FormGroup> 
                                       {values.map((filter : string, index) => {
                                          return (
                                          <FormControlLabel
                                             sx={{paddingLeft:1}}
                                             control={
                                             <Checkbox
                                                checked={filters[filter] || false}
                                                sx={{
                                                   '&.Mui-checked': { color: Colors.secondary,},
                                                }}
                                                onChange={(e) => handleFilterChange(filter, e)}
                                             />
                                             }
                                             label={filter}
                                             key={`course-topics-${index}`}
                                          />
                                          )
                                       })}
                                    </FormGroup>
                                 </Stack>
                                 )
                                 })}
                           </Stack>
                        </Grid>
                     </Grid>
                  </CardContent>
               </DefaultCard>
            </Grid>
            <Grid item width={"100%"}>
               <Stack direction={"column"} spacing={2}>
                  <Stack direction={"row"} spacing={2} padding={2} alignItems={"flex-start"} justifyContent={"space-between"} minHeight={"120px"}>
                     <Stack direction={"column"} key={"left-head"} spacing={1.5}>
                        <Stack direction={"row"} key="left-head">
                           <Typography fontWeight={"bold"} fontSize={FontSize.super}>{courses.length} kết quả</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={1} alignItems={"center"} key="filter-chips">
                              {Object.entries(filters).map(([filter, isCheck], index) => {
                                 if (Boolean(isCheck)) {
                                    return (
                                    <Chip variant="filled" 
                                       key={`filter-chip-${index}`}
                                       color="default"
                                       label={
                                       <Typography variant="caption">
                                          {filter}
                                       </Typography>}/>
                                    )
                                 }
                              })}
                              {Object.values(filters).filter(Boolean).length > 0
                              && 
                              <TextButton 
                                 fontSize={FontSize.micro}
                                 onClick={handleDeleteAllFilters}
                                 >
                                 Xoá tất cả   
                              </TextButton>}
                           </Stack>
                     </Stack>
                     <Stack direction={"row"} key={"right-head"}>
                        <ControlledSelect
                           label="Sắp xếp theo"
                           options={CourseSortBy}
                           control={courseSearchForm.control}
                           name={"sortBy"}
                           defaultValue={CourseSortBy[0]}
                           sx={{
                              width: "150px",
                              borderRadius: "10px",
                              height: "40px",
                           }}
                           labelProps={{
                              variant: "body2"
                           }}
                        />
                     </Stack>
                  </Stack>
                  {courses.map((course, index) => {
                     return (
                        <DefaultCard key={`course-${index}`}>
                           <CardContent>
                              <Typography fontWeight={"bold"} variant={"h6"}>{course.name}</Typography>
                              <Typography>{course.description}</Typography>
                           </CardContent>
                        </DefaultCard>
                     )
                  })}
               </Stack>
            </Grid>
         </Stack>
      </MainContainer>
   </LayoutContainer>
   )
}