"use client"
import { LOGO_IMAGE_DARK } from "../../core/lib/image";
import Image from "next/image";
import { 
  DraftingCompass, 
  GraduationCap, 
  LogIn, 
  MenuIcon, 
  Pi, 
  SquareFunction, 
  Zap
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { 
  AppBar, 
  Box, 
  Divider, 
  Grid, 
  IconButton, 
  Link, 
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
import { FontSize } from "../../core/lib/style";
import { DefaultButton } from "../../core/index.ui";



export default function HeaderAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    console.log("Sessions: ", session)
  }, [])

  const ToolBar = (
    <Toolbar>
      <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
      ><MenuIcon /></IconButton>
    </Toolbar>
  ) 
  
  const NavMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };
    
    return (
      <Stack direction={"row"} spacing={3} alignContent={"center"} alignItems={"center"}>
        <DefaultButton
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="text"
          color="inherit"
          disableElevation
          endIcon={<KeyboardArrowDown />}
        >
          Khóa học
        </DefaultButton>
        <Menu
          id="demo-customized-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple 
            sx={{ paddingTop: 1, paddingBottom: 1}}>
          <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
            < Pi size={20}/>
              <Typography  sx={{fontSize: FontSize.medium}}>Lớp 10</Typography>
            </Stack>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple 
            sx={{ paddingTop: 1, paddingBottom: 1}}>
            <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
              < DraftingCompass size={20}/>
              <Typography  sx={{fontSize: FontSize.medium}}>Lớp 11</Typography>
            </Stack>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple 
            sx={{fontSize: FontSize.medium, paddingTop: 1, paddingBottom: 1}}>
            <Stack direction={"row"} spacing={2} alignItems={"center"} alignContent={"center"}>
              < SquareFunction size={20}/>
              <Typography  sx={{fontSize: FontSize.medium}}>Lớp 12</Typography>
            </Stack>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple 
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
    )
  }

  const DynamicContent = () => {

    if (status === "loading") {
      return (
        <Grid container direction={"row-reverse"} paddingRight={2} paddingLeft={2} spacing={2} alignContent={"center"} alignItems={"flex-end"}>
          <Grid item xs={3}>
            <Skeleton variant="rectangular" height={40} />
          </Grid>
        </Grid>
      )
    }
    
    if (session) {
      return (
        <Grid container direction={"row-reverse"} paddingRight={2} paddingLeft={2} spacing={2} alignContent={"center"} alignItems={"flex-end"}>
          <Grid item xs={3}>
            <DefaultButton 
              fullWidth
              onClick={async () => {
                await signOut()
                router.push("/login")
              }}
              startIcon={<LogIn size={20}/>} 
              variant="outlined"
              color="inherit"
            >
              {"Đăng xuất"}
            </DefaultButton> 
          </Grid>
        </Grid>
      )
    }

    return (
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
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }} flexDirection={"row"}>
      <AppBar position="sticky"  sx={{ paddingTop: 1, paddingBottom: 1, backgroundColor: "white" }}>
        <Toolbar>
          <Grid container direction={"row"} alignItems={"center"}>
            <Grid item xs={2} sx={{display: "flex", alignItems: "center", paddingLeft: 5}}>
                <Link href={"/"}>
                  <Image 
                    priority 
                    width={130} 
                    src={LOGO_IMAGE_DARK} alt="Logo"/>
                </Link>
            </Grid>
            <Grid item xs={4} alignItems={"flex-start"}>
              <NavMenu />
            </Grid>
            <Grid item xs={6} alignItems={"flex-end"}>
                <DynamicContent />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> 
      {/* https://stackoverflow.com/questions/48508449/content-beneath-fixed-appbar */}
      <Toolbar />
    </Box>
  )
}



