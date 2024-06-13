"use client"
import { LOGO_IMAGE_DARK } from "../../@core/lib/image";
import Image from "next/image";
import { 
  Bell,
  BellIcon,
  BookMarkedIcon,
  Bookmark,
  BusFront,
  CircleUserIcon,
  DraftingCompass, 
  GraduationCap, 
  Heart, 
  History, 
  Layers, 
  LockKeyholeIcon, 
  LogIn, 
  LogOutIcon, 
  Pi, 
  Settings, 
  SquareFunction, 
  SquareUser, 
  Zap
} from "lucide-react";
import React, { useState } from "react";
import { 
  AppBar, 
  Avatar, 
  Box, 
  Button, 
  Divider, 
  Grid, 
  IconButton, 
  Menu, 
  MenuItem, 
  Skeleton, 
  Stack, 
  Toolbar, 
  Typography,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FontSize, GlobalStyle, Styles } from "../../@core/lib/style";
import { Platform } from "../../@core/lib/message";
import { useUser } from "../../@core/index.context";
import { DefaultButton, DefaultDialog, InfoTooltip } from "../../@core/index.ui";
import { Global } from "@emotion/react";
import { createMenu } from "./MenuGroup";
import { Role } from "@/@core/index.models";
import Link from "next/link";


const userMenu = [
  createMenu("Lịch sử thanh toán", <History size={23}/>, "/profile/billing"),
  createMenu("Cài đặt", <Settings size={23}/>, "/profile/settings"),
  createMenu("Trang quản trị", <Layers size={23}/>, "/dashboard", undefined, [Role.ADMIN, Role.STAFF])
]   

const headerMenu = [
  createMenu("Khoá học", <Bookmark size={23}/>, "/courses"),
  createMenu("Lộ trình", <BusFront size={23}/>, "/roadmaps"),
  createMenu("Về chúng tôi", <Layers size={23}/>, "/about")
]   


export default function HeaderUser() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { 
    handleOpenChangePassword,
  } = useUser();

  // Dynamic content
  const [anchorElDynamic, setAnchorElDynamic] = useState<null | HTMLElement>(null);
  const openDynacmic = Boolean(anchorElDynamic);
  const handleHoverDynacmic = (event: React.MouseEvent<HTMLElement>) => { setAnchorElDynamic(event.currentTarget); };
  const handleClickDynacmic = (event: React.MouseEvent<HTMLElement>) => { setAnchorElDynamic(event.currentTarget); };
  const handleCloseDynacmic = () => { setAnchorElDynamic(null); };

  // Navmenu
  const [anchorElNavmenu, setAnchorElNavmenu] = useState<null | HTMLElement>(null);
  const openNavmenu = Boolean(anchorElNavmenu);
  const handleClickNavmenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElNavmenu(event.currentTarget); };
  const handleCloseNavmenu = () => { setAnchorElNavmenu(null); };

  // Signout dialog
  const [openSignout, setOpenSignout] = React.useState(false);

  const { contextStatus } = useUser();

  const handleClickOpenSignout = () => {
    setOpenSignout(true);
  };

  const handleCloseSignout = () => {
    setOpenSignout(false);
  };



  return (
    <Box sx={{ flexGrow: 1 }} flexDirection={"row"}>
      <AppBar position="sticky"  
        sx={{ backgroundColor: "white", width: "100%"}}
        >
        <Toolbar sx={{justifyContent: "center"}}>
        {/* <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
          ><MenuIcon /></IconButton>
        </Toolbar> */}
          <Grid container direction={"row"} alignItems={"center"} width={GlobalStyle.width}>
            <Grid item xs={2} sx={{display: "flex", alignItems: "center", paddingLeft: 5}}>
                <Image 
                  onClick={() => router.push("/")}
                  priority 
                  width={130} 
                  style={{cursor: "pointer"}}
                  src={LOGO_IMAGE_DARK} alt="Logo"/>
            </Grid>
            <Grid item xs={4} alignItems={"flex-start"}>
              {
                contextStatus === "loading" ?
                <Grid container direction={"row"}  spacing={2} justifyContent={"flex-start"} alignItems={"center"}>
                  <Grid item xs={4} justifyContent={"flex-end"}>
                    <Skeleton variant="rectangular" height={25}/>
                  </Grid>
                  <Grid item xs={4} justifyContent={"flex-end"}>
                    <Skeleton variant="rectangular" height={25}/>
                  </Grid>
                  <Grid item xs={4}  justifyContent={"flex-end"}> 
                      <Skeleton variant="rectangular" height={25}/>
                  </Grid>
                </Grid>
                :
                <Stack direction={"row"} spacing={4} alignContent={"center"} alignItems={"center"}>
                  {
                    headerMenu.map((item) => {
                      return (
                        <DefaultButton 
                          variant="text" 
                          color="inherit" 
                          onClick={() => { router.push(item.path) }}
                        >
                          {item.name}
                        </DefaultButton>
                      )
                    })
                  }
                </Stack>
              }
            </Grid>
            <Grid item xs={6} alignItems={"flex-end"}>
                {
                  contextStatus === "loading" 
                  ?
                  <Grid container direction={"row"}  spacing={2} justifyContent={"flex-end"} alignItems={"center"}>
                    <Grid item xs={1} justifyContent={"flex-end"}>
                      <Skeleton variant="rectangular" height={25}/>
                    </Grid>
                    <Grid item xs={3} justifyContent={"flex-end"}>
                      <Skeleton variant="rectangular" height={25}/>
                    </Grid>
                    <Grid item xs={1}  justifyContent={"flex-end"}> 
                      <Skeleton variant="circular" height={40} width={40} />
                    </Grid>
                  </Grid>
                  :
                  !session ? 
                  <Stack direction={"row-reverse"} spacing={2} alignContent={"center"} alignItems={"flex-end"}>
                    <DefaultButton 
                      fullWidth
                      href="/login" 
                      maxWidth="170px"
                      startIcon={<Zap size={20}/>} 
                    >
                      Đăng nhập
                    </DefaultButton> 
                    <DefaultButton 
                      fullWidth
                      href="/register" 
                      maxWidth="170px"
                      startIcon={<LogIn size={20}/>} 
                      variant="outlined"
                      color="inherit"
                    >
                      Đăng ký
                    </DefaultButton> 
                  </Stack>
                  :
                    <Grid container direction={"row"} paddingRight={2} paddingLeft={2} spacing={3} justifyContent={"flex-end"} alignItems={"center"}>
                      <Grid item>
                        <DefaultButton
                          aria-controls={openDynacmic ? 'demo-customized-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={openDynacmic ? 'true' : undefined}
                          onClick={() => router.push('/user/study')}
                          variant="text"
                          color="inherit"
                          disableElevation
                          startIcon={<BookMarkedIcon size={20}/>}
                        >
                          Khóa học của tôi
                        </DefaultButton>
                      </Grid>
                      <Grid item>
                        <IconButton color="inherit">
                          <Bell size={26}/>
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Avatar
                          src={session?.user.avatar}
                          
                          sx={{
                            ...Styles.Avatar,
                            width: 42, 
                            height: 42, 
                            
                          }}
                          onClick={handleClickDynacmic}
                          >
                          {session?.user.fullName?.[0]?.toUpperCase() ?? ''}
                        </Avatar>
                      </Grid>
                      <Menu
                        id="demo-customized-menu"
                        anchorEl={anchorElDynamic}
                        open={openDynacmic}
                        onClose={handleCloseDynacmic}
                        anchorOrigin={{
                          vertical: 50,
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <Stack direction={"column"} 
                          spacing={2} 
                          justifyContent={"center"} 
                          alignItems={"center"}
                          paddingTop={1} paddingBottom={1}                        
                        >
                          <InfoTooltip title="Thông tin cá nhân" placement="right-end">
                            <Link href={"/profile/info"}
                              onClick={() => { handleCloseDynacmic();}}
                            >
                              <Avatar
                                src={session?.user.avatar}
                                sx={{
                                  ...Styles.Avatar,
                                  width: 80, 
                                  height: 80, 
                                }}
                                >
                                {session?.user.fullName?.[0]?.toUpperCase() ?? ''}
                              </Avatar>
                            </Link>
                          </InfoTooltip>
                          
                          <Typography variant="h6" fontWeight={"bold"}>{session?.user.fullName}</Typography>
                        </Stack>
                        <Divider sx={{ my: 0.5 }} />
                        {
                          userMenu.map((item) => {
                            if (item.roles && !item.roles.includes(session?.user.role)) return;
                            return (
                            <MenuItem  disableRipple onClick={() => { handleCloseDynacmic(); router.push(item.path)}}
                            sx={{ paddingTop: 1, paddingBottom: 1}}>
                              <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                                {item.icon}
                                <Typography  sx={{fontSize: FontSize.semium}}>{item.name}</Typography>
                              </Stack>
                          </MenuItem>
                          )
                          })
                        }
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem onClick={() => { handleCloseDynacmic(); handleClickOpenSignout(); }} disableRipple 
                        sx={{ paddingTop: 1, paddingBottom: 1}}>
                        <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                          < LogOutIcon size={20}/>
                          <Typography  sx={{fontSize: FontSize.semium}}>Đăng xuất</Typography>
                        </Stack>
                      </MenuItem>
                    </Menu>
                    </Grid>
                }
            </Grid>
          </Grid>
          <DefaultDialog
            sx={{
              margin: 10,
            }}
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
        </Toolbar>
      </AppBar> 
      {/* https://stackoverflow.com/questions/48508449/content-beneath-fixed-appbar */}
      {/* <Toolbar /> */}
    </Box>
  )
}



