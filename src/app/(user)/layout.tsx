"use client";
import HeaderUser from "@/components/navbar/HeaderUser";
import HeaderAdmin from "@/components/navbar/HeaderAdmin";
import { usePathname } from "next/navigation";
import FooterUser from "@/components/navbar/FooterUser";
import React from "react";
import 'dayjs/locale/vi'
import 'dayjs/locale/en-gb'
import UserProviders from "./providers";

type Props = Readonly<{
  children: React.ReactNode;
}>;


export default function LayoutMain( props : Props ) {
 
    const pathname = usePathname();
    return(
        <UserProviders>
            {pathname.startsWith("/admin") ? <HeaderAdmin/> : <HeaderUser />}
                {props.children}
            {!pathname.startsWith("/admin") && <FooterUser />}
        </UserProviders>
    )
}   