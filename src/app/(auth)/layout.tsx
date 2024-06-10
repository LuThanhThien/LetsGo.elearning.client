"use client"
import { 
    AUTH_THUMBNAIL1, 
    AUTH_THUMBNAIL2,
} from "../../core/lib/image";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, Stack } from "@mui/material";
import { Colors } from "../../core/lib/style";
import { randomChoice } from "../../core/lib/utils";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { ArrowBigLeftDash, LogOutIcon } from "lucide-react";
import {
    DefaultButton,
} from "../../core/index.ui";


// export const metadata = {
//     title: "Đăng nhập",
// }

const AuthLayout = ({ children: children }: { children: React.ReactNode }) => { 
    const {data: session, status} = useSession();
    const router = useRouter();
    const choiceImages = [
        AUTH_THUMBNAIL1, 
        AUTH_THUMBNAIL2,
    ];

    useEffect(() => {
        if (session) {
           console.log("User is logged in.")
           console.log(session)
        }
     }, [session])

    if (status === "loading") {
        return (
            <Loading/>
        )
    }

    if (session?.user) {
        return (
        <Grid
            container 
            direction={"column"} 
            sx={{
            width: "100%",
            height: "100vh",
            alignItems: "center",
            justifyItems: "center",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: Colors.primaryLighten,
        }}>
            <Grid item padding={1.5}>
                <Typography variant="h4" fontWeight={"bold"}>Bạn đã đăng nhập!</Typography>
            </Grid>
            <Grid item padding={1.5}>
                <Typography variant="body2">Bạn có thể truy cập vào trang chủ của mình.</Typography>
            </Grid>
            <Grid item padding={1.5}>
                <Stack direction={"row"} spacing={2} width={"350px"}>
                <DefaultButton 
                    startIcon={<ArrowBigLeftDash size={23} />}
                    onClick={() => router.push("/")} 
                >
                    Trang chủ
                </DefaultButton>
                <DefaultButton 
                    startIcon={<LogOutIcon size={23} />}
                    variant="contained"
                    color="info"
                    onClick={async () => {
                        await signOut()
                        router.push("/login")
                    }}>
                    Đăng xuất
                </DefaultButton>
                </Stack>
                
            </Grid>
        </Grid>

        )
     }

    return(
    <Grid
        container 
        direction={"column"} 
        sx={{
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyItems: "center",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: Colors.primaryLighten,
    }}>
        <Grid item
        sx={{
            top: "50%",
            left: "50%",
        }}
        >
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
        </Grid>
    </Grid>
   )
}

export default AuthLayout;