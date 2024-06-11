"use client"
import { LoadingCircle } from "@/app/loading";
import { Avatar, Box, Button, Card, CardContent, Divider, Drawer, Grid, Skeleton, Stack, Toolbar, Typography, styled } from "@mui/material";
import { Heart, History, LockKeyhole, Settings, SquareUser } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { MenuGroup, createMenu } from "../../../components/index.component";
import { Platform } from "../../../core/lib/message";
import { Colors, Styles } from "../../../core/lib/style";
import { UserProvider, useUser } from "../../../core/index.context";
import {
    DefaultButton,
    DefaultDialog,
  } from "../../../core/index.ui";
import { MainContainer } from "@/app/layout.main";


interface Props {
    window?: () => Window;
    children: React.ReactNode;
}


export default function ProfileLayout(props : Props) {
    const { data: session, status, update } = useSession();
    const drawerWidth = 320;
    function maxWidthName (name: string) {
        if (name.length > 10) {
            return 240;
        }
        return 300;
    }

    const { contextStatus } = useUser();
    

    const userMenu = [
        createMenu("Thông tin cá nhân", <SquareUser size={23}/>, "/user/profile/general"),
        createMenu("Lịch sử thanh toán", <History size={23}/>, "/user/profile/billing"),
        createMenu("Khoá học đã lưu", <Heart size={23}/>, "/user/profile/saved-courses"),
        createMenu("Cài đặt", <Settings size={23}/>, "/user/profile/settings"),
    ]   

    // Signout dialog
    const [openSignout, setOpenSignout] = useState(false);

    const handleClickOpenSignout = () => {
        setOpenSignout(true);
    };

    const handleCloseSignout = () => {
        setOpenSignout(false);
    };

    return (
    <MainContainer 
        backgroundProps={{
            sx: {
                backgroundColor: Colors.shadow,
            }
        }}
        contentProps={{
            direction: "row"
        }}
    >
        <Stack 
        direction={"row"}
        sx={{
            with: drawerWidth,
            maxWidth: drawerWidth,
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            padding: 3,
            paddingRight: 2,
           
        }}>
            <Card sx={{
                ...Styles.Card,
                position: 'sticky',
                top: 10,
            }}>
                <CardContent>
                    <Grid container direction={"column"} 
                    spacing={2}
                    sx={{ 
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Grid item marginTop={3}>
                            {
                                (contextStatus === "loading")
                                ?
                                <Skeleton animation="wave" variant="circular" sx={{...Styles.Avatar, width: 200, height: 200}} /> 
                                : 
                                <Avatar src={session?.user.avatar} sx={{...Styles.Avatar, width: 200, height: 200}}>
                                    <Typography variant="h2">{session?.user.fullName?.[0]?.toUpperCase() ?? ''}</Typography>
                                </Avatar>
                            }
                        </Grid>
                        <Grid item>
                            {
                                (contextStatus === "loading")
                                ?
                                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                <Skeleton animation="wave" variant="text" width={100} /> 
                                <Skeleton animation="wave" variant="text" width={140} /> 
                                </Stack>
                                
                                :
                                <Typography variant="h5" fontWeight={"bold"} 
                                    sx={{
                                        wordBreak: 'break-word', 
                                        justifyContent: "center",
                                        textAlign: "center",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: maxWidthName(session?.user.fullName ?? ''), 
                                        lineHeight: 1.5,
                                    }}
                                >{session?.user.fullName}</Typography>
                            }
                            
                        </Grid>
                        <Grid item style={{ alignSelf: "stretch" }}>
                            <Divider orientation="vertical"/>
                        </Grid>
                        <Grid item>
                            <Stack direction="column" spacing={1} sx={{ overflow: 'auto' }}>
                                {userMenu.map((item, index) => (
                                    <MenuGroup key={index} item={item}/>
                                ))}
                            </Stack>
                        </Grid>
                        <Grid item></Grid>
                        <Grid item xs={12} sx={{width: "80%", paddingBottom: 10}}>
                            <DefaultButton fullWidth onClick={handleClickOpenSignout} variant="outlined" color="error">
                                Đăng xuất
                            </DefaultButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Stack>
        {props.children}
    <DefaultDialog
        open={openSignout}
        onClose={handleCloseSignout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        title="Đăng xuất"
        content={Platform.SignoutMessage}
        renderActions={() => (
            <>
            <Button onClick={handleCloseSignout} variant="text" color="info">
                Hủy
            </Button>
            <Button onClick={() => { handleCloseSignout(); signOut() }} variant="text" color="error" autoFocus>
                Đăng xuất
            </Button>
            </>
        )}
    />
    </MainContainer>
  );
}


