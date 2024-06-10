import React from 'react';

import { Contact, Content } from '../../seeds/info';
import { 
   FACEBOOK_SQUARE,
   TIKTOK_SQUARE,
   YOUTUBE_SQUARE
} from '../../core/lib/image';
import Image from 'next/image';
import { Box, Divider, Grid, IconButton, Input, Link, Stack, TextField, Typography } from '@mui/material';
import { Colors, FontSize } from '../../core/lib/style';
import { Send } from 'lucide-react';


export default function FooterUser() {
   const maxRows = 3;
  
   const FooterInformation = () => {
      return (
      <Stack spacing={{ xs: 1}} 
         direction="row" 
         useFlexGap 
         flexWrap="wrap"
         justifyContent={"space-between"}
         alignItems={"flex-start"}
         >
         {Object.keys(Content).map((header : string, index) => {
            return (
               <Box paddingBottom={0.5} key={`header-${index}`}>
                  <Typography sx={{ fontSize: 17, fontWeight: "bold", paddingBottom: 2 }}>
                     {header}
                  </Typography>
                  <Grid container direction={"column"} spacing={1}>
                  {Object.keys(Content[header]).map((info :string, infoIndex: number) => {
                     return (
                     <Grid item key={`info-${infoIndex}`}>
                        <Grid container direction={"column"} spacing={1}>
                        {/* Headers */}
                           {Content[header][info].href !== "" 
                              ?
                              <Grid item><Link href={Content[header][info].href} 
                                 underline="none" color="inherit"
                                 sx={{ '&:hover': { color: Colors.secondary } }}
                                 fontSize={FontSize.small}>
                                 {info}
                              </Link></Grid>
                              :
                              <Grid item>
                                 <Typography paddingTop={1} fontSize={FontSize.small} fontWeight={"bold"}>{info}</Typography>
                              </Grid>
                           }
                        {/* static content */}
                        {Content[header][info].child.length > 0 && (
                           Content[header][info].child.map((child : string, staticIndex: number) => {
                              return (
                                 <Grid item key={`static-${staticIndex}`}>
                                    <Typography fontSize={FontSize.small} paddingLeft={0.5} paddingTop={0.5} paddingBottom={0.5}>
                                       {child}
                                    </Typography>
                                 </Grid>
                              )
                           })
                        )}
                        </Grid>
                     </Grid>
                     )
                  })}
                  </Grid>
               </Box>
            )   
         })}
      </Stack>
      )
   }

   
   const FooterFollow = () => {
      return (
        <Stack paddingLeft={10}>
            <Typography sx={{ fontSize: FontSize.medium, fontWeight: "bold", paddingBottom: 2 }}>
               Theo dõi chúng tôi
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Link href={Contact.facebook} target="_blank" rel="noreferrer">
                  <Image width={40} src={FACEBOOK_SQUARE} alt="facebook"
                     
                  />
                </Link>
                <Link href={Contact.tiktok} target="_blank" rel="noreferrer">
                  <Image width={40} src={TIKTOK_SQUARE} alt="facebook" />
                </Link>
                <Link href={Contact.youtube} target="_blank" rel="noreferrer">
                  <Image width={40} src={YOUTUBE_SQUARE} alt="facebook" />
                </Link>
            </Stack>
            <Stack direction={"row"} spacing={1} paddingTop={2}>
                <Input sx={{fontSize: FontSize.small}} placeholder='Nhập email của bạn'></Input>
                <IconButton color='inherit' aria-label="send email">
                  <Send/>
                </IconButton>
            </Stack>
        </Stack>
      )
   }

   return (
      <Box sx={{ flexGrow: 1 }} bgcolor={Colors.primaryLighten}>
         <Grid container direction={"row"} 
            paddingTop={5} paddingBottom={5}
            paddingLeft={30} paddingRight={30}
         >
            <Grid item xs={8}>
               <FooterInformation/>
            </Grid>
            <Grid item xs={4}>
               <FooterFollow/>
            </Grid>
            <Grid item xs={12} paddingTop={4}>
               <Divider color={"black"}/>
            </Grid>
            <Grid item xs={12} 
               paddingTop={3}
               alignItems={"flex-start"}
               >
                  <Typography fontSize={FontSize.micro} fontWeight={"bold"}>
                     Let's Go HCMC &copy; {new Date().getFullYear()} All rights reserved.
                  </Typography>
            </Grid>
         </Grid>
      </Box>
   )

}

