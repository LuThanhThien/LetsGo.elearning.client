"use client"

import HeaderUser from "@/components/navbar/HeaderUser";
import HeaderAdmin from "@/components/navbar/HeaderAdmin";
import { usePathname } from "next/navigation";
import FooterUser from "@/components/navbar/FooterUser";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { elGR } from  "@mui/x-date-pickers/locales";
import 'dayjs/locale/vi'
import 'dayjs/locale/en-gb'
import { UserProvider } from "../core/index.context";
import { Box, Grid, Stack, StackProps, styled } from "@mui/material";
import { GlobalStyle } from "@/core/lib/style";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export type MainContainerProps = {
    backgroundProps?: StackProps;
    contentProps?: StackProps;
} & Props;

export const BackgroundContainer = styled(Stack)<StackProps>(({theme}) => {
    return {
        backgroundColor: theme.palette.background.default,
        width: "100%",
        justifyItems: "center",
        alignItems: "center",
    }
})

export const ContentContainer = styled(Stack)<StackProps>(({theme}) => {
    return {
        width: GlobalStyle.width,
    }
})

export function MainContainer( props: MainContainerProps ) {
    return (
        <BackgroundContainer {...props.backgroundProps}>
            <ContentContainer {...props.contentProps}>
                {props.children}
            </ContentContainer>
        </BackgroundContainer>
    
    )
}

export default function LayoutMain( props : Props ) {
    const pathname = usePathname();
    if (pathname === "/login" || pathname === "/register") return props.children;

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'vi'}
            localeText={
                elGR.components.MuiLocalizationProvider.defaultProps.localeText
            }
        >
            <UserProvider>
                {pathname.startsWith("/admin") ? <HeaderAdmin/> : <HeaderUser />}
                    {props.children}
                {!pathname.startsWith("/admin") && <FooterUser />}
            </UserProvider>
        </LocalizationProvider>

    )
}   