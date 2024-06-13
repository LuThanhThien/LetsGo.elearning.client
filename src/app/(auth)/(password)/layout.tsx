"use client";
import Grid from '@mui/material/Grid';
import { Card } from "@mui/material";
import React from "react";


const AuthLayout = ({ children: children }: { children: React.ReactNode }) => { 

    return(
        <Card>
            <Grid container direction={"column"} 
                spacing={3} sx={{padding: 2}}
                justifyContent={"center"} alignItems={"center"}
                >
                <Grid item justifyContent={"center"} > 
                    {children}
                </Grid>
            </Grid>
        </Card>
   )
}

export default AuthLayout;