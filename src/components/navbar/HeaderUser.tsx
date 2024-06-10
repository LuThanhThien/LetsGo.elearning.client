"use client"
import { LOGO_IMAGE_DARK } from "../../core/lib/image";
import Image from "next/image";
import { 
  Bell,
  BellIcon,
  BookMarkedIcon,
  CircleUserIcon,
  DraftingCompass, 
  GraduationCap, 
  History, 
  LockKeyholeIcon, 
  LogIn, 
  LogOutIcon, 
  Pi, 
  SquareFunction, 
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
import { FontSize, Styles } from "../../core/lib/style";
import { Platform } from "../../core/lib/message";
import { useUser } from "../../core/index.context";
import { DefaultButton, DefaultDialog } from "../../core/index.ui";



export default function HeaderUser() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { 
    handleOpenChangePassword,
  } = useUser();

  // Dynamic content
  const [anchorElDynamic, setAnchorElDynamic] = useState<null | HTMLElement>(null);
  const openDynacmic = Boolean(anchorElDynamic);
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

  // useEffect(() => {
  //   console.log("contextStatus", contextStatus)
  // }, [contextStatus])


  return (
    <Box sx={{ flexGrow: 1 }} flexDirection={"row"}>
      <AppBar position="sticky"  
        sx={{ paddingTop: 1, paddingBottom: 1, backgroundColor: "white" }}
        >
        <Toolbar>
        {/* <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
          ><MenuIcon /></IconButton>
        </Toolbar> */}
          <Grid container direction={"row"} alignItems={"center"}>
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
                <Stack direction={"row"} spacing={3} alignContent={"center"} alignItems={"center"}>
                  <DefaultButton
                    aria-controls={openNavmenu ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openNavmenu ? 'true' : undefined}
                    onClick={handleClickNavmenu}
                    variant="text"
                    color="inherit"
                    disableElevation
                    endIcon={<KeyboardArrowDown />}
                  >
                    Khóa học
                  </DefaultButton>
                  <Menu
                    id="demo-customized-menu"
                    anchorEl={anchorElNavmenu}
                    open={openNavmenu}
                    onClose={handleCloseNavmenu}
                  >
                    <MenuItem onClick={() => {handleCloseNavmenu(); router.push("/study/grade-10")}} disableRipple 
                      sx={{ paddingTop: 1, paddingBottom: 1}}>
                    <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                      < Pi size={20}/>
                        <Typography  sx={{fontSize: FontSize.medium}}>Lớp 10</Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => {handleCloseNavmenu(); router.push("/study/grade-11")}} disableRipple 
                      sx={{ paddingTop: 1, paddingBottom: 1}}>
                      <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                        < DraftingCompass size={20}/>
                        <Typography  sx={{fontSize: FontSize.medium}}>Lớp 11</Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => {handleCloseNavmenu(); router.push("/study/grade-12")}} disableRipple 
                      sx={{fontSize: FontSize.medium, paddingTop: 1, paddingBottom: 1}}>
                      <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                        < SquareFunction size={20}/>
                        <Typography  sx={{fontSize: FontSize.medium}}>Lớp 12</Typography>
                      </Stack>
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => {handleCloseNavmenu(); router.push("/study/thptqg")}} disableRipple 
                      sx={{ paddingTop: 1, paddingBottom: 1}}>
                      <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                        < GraduationCap size={20}/>
                        <Typography  sx={{fontSize: FontSize.medium}}>Thi THPTQG</Typography>
                      </Stack>
                    </MenuItem>
                  </Menu>
                  <DefaultButton 
                    variant="text" 
                    color="inherit" 
                    onClick={() => { router.push("/price") }}
                  >
                    Bảng giá
                  </DefaultButton>
                  <DefaultButton 
                    variant="text" 
                    color="inherit" 
                    onClick={() => { router.push("/about") }}
                  >
                    Về chúng tôi
                  </DefaultButton>
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
                  <Grid container direction={"row-reverse"} paddingRight={2} paddingLeft={2} spacing={2} alignContent={"center"} alignItems={"flex-end"}>
                    <Grid item xs={3}>
                      <DefaultButton 
                        fullWidth
                        href="/login" 
                        startIcon={<Zap size={20}/>} 
                      >
                        Đăng nhập
                      </DefaultButton> 
                    </Grid>
                    <Grid item xs={3}>
                      <DefaultButton 
                        fullWidth
                        href="/register" 
                        startIcon={<LogIn size={20}/>} 
                        variant="outlined"
                        color="inherit"
                      >
                        Đăng ký
                      </DefaultButton> 
                    </Grid>
                  </Grid>
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
                            width: 46, 
                            height: 46, 
                            
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
                      >
                      <MenuItem  disableRipple onClick={() => { handleCloseDynacmic(); router.push("/user/profile/general")}}
                        sx={{ paddingTop: 1, paddingBottom: 1}}>
                        <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                          < CircleUserIcon size={20}/>
                          <Typography  sx={{fontSize: FontSize.medium}}>Thông tin cá nhân</Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem onClick={() => { handleCloseDynacmic(); handleOpenChangePassword(); router.push('/user/profile/general') }} disableRipple 
                        sx={{ paddingTop: 1, paddingBottom: 1}}>
                        <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                          < LockKeyholeIcon size={20}/>
                          <Typography  sx={{fontSize: FontSize.medium}}>Đổi mật khẩu</Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem onClick={() => { handleCloseDynacmic(); router.push('/user/profile/billing') }} disableRipple 
                        sx={{ paddingTop: 1, paddingBottom: 1}}>
                        <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                          < History size={20}/>
                          <Typography  sx={{fontSize: FontSize.medium}}>Lịch sử thanh toán</Typography>
                        </Stack>
                      </MenuItem>
                      {/* <MenuItem onClick={() => { handleCloseDynacmic(); router.push('/user/profile/settings') }} disableRipple 
                        sx={{ paddingTop: 1, paddingBottom: 1}}>
                        <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                          < Settings size={20}/>
                          <Typography  sx={{fontSize: FontSize.medium}}>Cài đặt</Typography>
                        </Stack>
                      </MenuItem> */}
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem onClick={() => { handleCloseDynacmic(); handleClickOpenSignout(); }} disableRipple 
                        sx={{ paddingTop: 1, paddingBottom: 1}}>
                        <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
                          < LogOutIcon size={20}/>
                          <Typography  sx={{fontSize: FontSize.medium}}>Đăng xuất</Typography>
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



