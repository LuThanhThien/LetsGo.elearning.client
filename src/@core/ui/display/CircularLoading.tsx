"use client"
import { CircularProgress, Grid } from "@mui/material";

export function CircularLoading() {
    return (
        <Grid container width={"100%"} height={"100vh"}  justifyContent={"center"} alignItems={"center"}>
            <Grid item>
                <CircularProgress color="inherit"/>
            </Grid>
        </Grid>
    )
}
