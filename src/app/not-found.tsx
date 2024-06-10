"use client"
import { Grid, Link, Stack, Typography } from "@mui/material";
import { ArrowBigLeftDash, Headset } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Colors } from "../core/lib/style";
import { Platform } from "../core/lib/message";
import { DefaultButton } from "../core/index.ui";

export default function NotFound() {
   const router = useRouter();

   return (
      <Grid container direction="column" padding={20} spacing={3} justifyContent={"center"} alignItems={"center"} width={"100%"}>
         <Grid item>
            <Typography variant="h4" fontWeight={"bold"}>Không có kết quả</Typography>
         </Grid>
         <Grid item >
            <Typography variant="h1" fontWeight={"bold"}> 404 </Typography>
         </Grid>
         <Grid item> 
            <Typography variant="body2">Trang này đang trong quá trình phát triển của <Link underline="hover" color={Colors.secondary} fontWeight={"bold"} href="/">Let's Go</Link> hoặc không tồn tại!</Typography>
         </Grid>
         <Grid item>
            <Stack direction={"row"} spacing={2}>
               <DefaultButton sx={{width: 200}} onClick={() => router.push("/")} startIcon={<ArrowBigLeftDash size={23} />}>Về trang chủ</DefaultButton>
               <DefaultButton sx={{width: 250}} 
                  onClick={() => toast.warning(Platform.NotYetSupport)}
                  variant="outlined" color="inherit" href="" startIcon={<Headset size={23} />}>Liên hệ chúng tôi</DefaultButton>
            </Stack>
         </Grid>
      </Grid>
   )
}
