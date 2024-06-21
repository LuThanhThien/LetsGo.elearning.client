"use client";
import { CourseCard, LayoutContainer, MainContainer } from "@/components/index.component";
import {
   Box,
   CardContent,
   Checkbox,
   Chip,
   Divider,
   FormControlLabel,
   FormGroup,
   Grid,
   SelectChangeEvent,
   Stack,
   Typography,
} from "@mui/material";
import './styles.css'
import theme from "@/theme";
import { DefaultCard, DefaultSelect, SearchField, TextButton } from "@/@share/index.ui";
import { CourseFilters, CourseSortBy } from "@/seeds/course";
import { useEffect, useState } from "react";
import { getCourseList } from "@/app/api/index.api";
import { toast } from "sonner";
import { CourseModel, DisplayStatus } from "@/@share/index.models";
import { Colors, FontSize } from "@/@share/lib/style";
import { getEnumValue } from "@/@share/lib/utils";
import { useUser } from "@/@core/index.provider";
import CoursesLoading from "./course-list.loading";
import CourseHeader from "./course-header.component";
import { BreadcrumbSx, CourseBreadcrumbs } from "./const";

export default function Courses() {
   const {
      session, contextStatus
   } = useUser();
   const [courses, setCourses] = useState<CourseModel[]>([]);
   const [fetchingCourse, setFetchingCourse] = useState<boolean>(true);
   const [searchValue, setSearchValue] = useState("");
   const [filters, setFilters] = useState<{ [key: string]: boolean }>({});
   const [sortBy, setSortBy] = useState<string>("");

   async function handleSearchCourses(value: string, filters: any) {
      setFetchingCourse(true);
      const res = await getCourseList();
      if (res.error) {
         toast.error("Lỗi hệ thống");
         setFetchingCourse(false);
         return;
      }
      setCourses(res.data.filter((course: CourseModel) => {
         return getEnumValue(DisplayStatus, course.displayStatus) ==  DisplayStatus.SHOW
      }))
      setFetchingCourse(false);
   }

   function handleFilterChange(filter: string, event: React.ChangeEvent<HTMLInputElement>) {
      setFilters({
         ...filters,
         [filter]: event.target.checked
      })
   }

   function handleOnSortChange(event: SelectChangeEvent<string>) {
      setSortBy(event.target.value);
   }

   function handleOnSearch(value: string) {
      setSearchValue(value);
   }

   function handleDeleteAllFilters() {
      setFilters({});
   }

   useEffect(() => {
      handleSearchCourses(searchValue, filters);
   }, [searchValue, filters])

   
   return (
   <LayoutContainer>
      <CourseHeader
         breadcrumbs={CourseBreadcrumbs}
         breadcrumbsProps={{
            sx: BreadcrumbSx
         }}
         height={"200px"}
      >
         <Grid item height={"100%"} alignContent={"center"}>
            <Typography 
               color={theme.palette.common.white}
               variant={"h3"}
               fontWeight={"bold"}
            >Tất cả khóa học</Typography>
         </Grid>
      </CourseHeader>
      <MainContainer
         backgroundProps={{
            paddingTop: 3,
            paddingBottom: 3,
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
               {contextStatus === "loading" || fetchingCourse ? 
               <CoursesLoading/> :               
               <Stack direction={"column"} spacing={2}>
                  <Stack direction={"row"} spacing={2} padding={2} alignItems={"flex-start"} justifyContent={"space-between"} minHeight={"120px"}>
                     <Stack direction={"column"} key={"left-head"} spacing={1.5}>
                        <Stack direction={"row"} key="left-head">
                           <Typography fontWeight={"bold"} fontSize={FontSize.super}>{courses.length} kết quả</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={1} alignItems={"center"} key="filter-chips" >
                              <Grid item 
                                 sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "7px",
                                    alignItems: "center"
                                 }}
                              >
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
                                    paddingLeft={1}
                                    >
                                    Xoá tất cả   
                                 </TextButton>}
                              </Grid>
                           </Stack>
                     </Stack>
                     <Stack direction={"row"} key={"right-head"}>
                        <DefaultSelect
                           label="Sắp xếp theo:"
                           options={CourseSortBy}
                           name={"sortBy"}
                           onChange={(e) => handleOnSortChange(e)}
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
                     <CourseCard
                        course={course}
                        key={`course-card-${index}`}
                     />
                     )
                  })}
               </Stack>}
            </Grid>
         </Stack>
      </MainContainer>
   </LayoutContainer>
   )
}