"use client";;
import { useUser } from "@/@core/index.provider";
import { CircularLoading } from "../../../../@share/index.ui";
import { FontSize, Styles } from "../../../../@share/lib/style";
import { Card, CardContent, Grid, Typography } from "@mui/material";


export default function SavedCoursePage() {

  const { 
    contextStatus, session
  } = useUser();
  

  if (contextStatus === "loading") return <CircularLoading/>;
    
  return (
    <Grid container padding={4} paddingLeft={2} rowSpacing={3}
      justifyContent={"flex-start"} alignItems={"flex-start"}
    >
      <Grid item xs={12}>
        <Grid container rowSpacing={2} direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Grid item xs={12}>
            <Typography fontSize={FontSize.super} fontWeight={"bold"} paddingLeft={1}>Khoá học đã lưu</Typography>
          </Grid>
          <Grid item xs={12}>  
            <Card 
              id="billing-profile-card"
              sx={{
                ...Styles.Card,
                minHeight: "650px",
                }}>
              <CardContent>
                <Grid container spacing={2} justifyContent={"center"} alignItems={"flex-start"}>
                  <Grid item xs={12}>
                    Tìm kiếm
                  </Grid>
                  <Grid item xs={12}>
                    Tìm kiếm
                  </Grid>
                </Grid>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
} 