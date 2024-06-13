"use client";;
import { 
    AUTH_THUMBNAIL1, 
    AUTH_THUMBNAIL2,
} from "../../../@core/lib/image";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Card } from "@mui/material";
import { randomChoice } from "../../../@core/lib/utils";
import React from "react";

const AuthLayout = ({ children: children }: { children: React.ReactNode }) => { 
    const choiceImages = [
        AUTH_THUMBNAIL1, 
        AUTH_THUMBNAIL2,
    ];

 
    return(
        <Card>
            {/* <Box
                component={"img"}
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    objectFit: "cover",
                    width: 200,
                    height: 200,
                }}
                src={LOGO_IMAGE_DARK.src}
                alt="Logo Image"
            /> */}
            <Grid container direction={"row"} 
                spacing={3} sx={{padding: 2}}
                justifyContent={"center"} alignItems={"center"}
                >
                <Grid item justifyContent={"center"}>
                    <Box
                        component="img"
                        sx={{
                            // objectFit: "cover",
                            width: 700,
                        }}
                        alt="Auth Thumbnail"
                        src={randomChoice(...choiceImages).src}
                    />
                </Grid>
                <Grid item justifyContent={"center"} > 
                    {children}
                </Grid>
            </Grid>
        </Card>
   )
}

export default AuthLayout;