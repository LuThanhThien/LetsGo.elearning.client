"use client"
import Loading from "@/app/loading";
import { Avatar, Box, Card, CardContent, Drawer, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
  }

export default function ProfileSettings(props: Props) {

    const {data: session, status} = useSession();

    if (status === "loading") return <Loading/>;

    return (
    <Grid container direction="row" spacing={2} padding={10}>
      Settings Page
    </Grid>
    )
}