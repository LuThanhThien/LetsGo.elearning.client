"use client";
import { useUser } from "@/@core/index.provider";
import Loading from "@/app/loading";
import { Grid } from "@mui/material";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
  }

export default function ProfileSettings(props: Props) {

    const { session, contextStatus } = useUser();

    if (contextStatus === "loading") return <Loading/>;

    return (
    <Grid container direction="row" spacing={2} padding={10}>
      Settings Page
    </Grid>
    )
}