import { CircularProgress, Grid, Skeleton } from "@mui/material";

export default function Loading() {
    return (
        <Grid container width={"100%"} height={"100vh"}  justifyContent={"center"} alignItems={"center"}>
            <Grid item>
                <CircularProgress color="inherit"/>
            </Grid>
        </Grid>
    )
}

export function LoadingRectangular( {width, height} : { width?: number, height?: number } ) {
    return (
        <Grid container width={"100%"} height={"100vh"}  justifyContent={"center"} alignItems={"center"}>
            <Grid item>
                <Skeleton variant="rectangular" width={width || 200} height={height || 50}/>
            </Grid>
        </Grid>
    )
}

export function LoadingCircle( {size} : { size?: number } ) {
    return (
        <Grid container width={"100%"} height={"100vh"}  justifyContent={"center"} alignItems={"center"}>
            <Grid item>
                <Skeleton variant="circular" width={size || 50} height={size || 50}/>
            </Grid>
        </Grid>
    )
}

