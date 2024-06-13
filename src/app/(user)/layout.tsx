"use client";
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
import { UserProvider } from "../../@core/index.context";

type Props = Readonly<{
  children: React.ReactNode;
}>;


export default function LayoutMain( props : Props ) {
 
    const pathname = usePathname();

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