"use client";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import { Heart, History, Layers, Settings, SquareUser } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { MainContainer, MenuGroup, createMenu } from "../../../components/index.component";
import { Platform } from "../../../@share/lib/message";
import { Styles } from "../../../@share/lib/style";
import { useUser } from "../../../@core/index.context";
import {
    DefaultButton,
    DefaultDialog,
  } from "../../../@share/index.ui";
import { Role } from "@/@share/index.models";


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

    const { contextStatus, } = useUser();
    

    const userMenu = [
        createMenu("Thông tin cá nhân", <SquareUser size={23}/>, "/profile/info"),
        createMenu("Lịch sử thanh toán", <History size={23}/>, "/profile/billing"),
        createMenu("Khoá học đã lưu", <Heart size={23}/>, "/profile/saved-courses"),
        createMenu("Trang quản trị", <Layers size={23}/>, "/dashboard", undefined, [Role.ADMIN, Role.STAFF]),
        createMenu("Cài đặt", <Settings size={23}/>, "/profile/settings"),
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
                        {
                            (contextStatus === "loading") 
                            ?
                        <Grid item>
                            <Stack direction={"column"} justifyContent={"center"} spacing={2} alignItems={"center"}>
                                <Skeleton animation="wave" variant="text" width={100} height={20}/> 
                                <Skeleton animation="wave" variant="text" width={140} height={20}/> 
                                <Skeleton animation="wave" variant="text" width={180} height={50}/>
                                <Skeleton animation="wave" variant="text" width={180} height={50}/>
                                <Skeleton animation="wave" variant="text" width={180} height={50}/>
                                <Skeleton animation="wave" variant="text" width={180} height={50}/>
                                <Skeleton animation="wave" variant="text" width={140} height={40}/> 
                            </Stack>
                        </Grid>
                        :
                        <>
                        <Grid item>
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
                        </Grid>
                        <Grid item style={{ alignSelf: "stretch" }}>
                            <Divider orientation="vertical"/>
                        </Grid>
                        <Grid item>
                            <Stack direction="column" spacing={0.5} sx={{ overflow: 'auto' }}>
                                {userMenu.map((item, index) => {
                                    if (item.roles && !item.roles.includes(session?.user.role)) return;
                                    return (
                                        <MenuGroup key={index} item={item}/>
                                    )
                                })}
                            </Stack>
                        </Grid>
                        <Grid item></Grid>
                        <Grid item xs={12} sx={{width: "80%", paddingBottom: 10}}>
                            <DefaultButton fullWidth onClick={handleClickOpenSignout} variant="outlined" color="error">
                                Đăng xuất
                            </DefaultButton>
                        </Grid>
                        </>
                        }
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


