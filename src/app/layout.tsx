import { interRegular } from "../@core/lib/font";
import { Metadata } from "next";
import { SessionContext } from "../@core/index.context";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import {Toaster} from "sonner";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import React, { Suspense } from "react";


export const metadata: Metadata = {
  title: {
    default: "Let's Go",
    template: "%s | Let's Go",
  },
  description: "Let's Go | Nền tảng học toán trực tuyến cho học sinh THPT",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props : Props) {

  return (
    <html lang="en">
      <body className={interRegular.className}>
        <SessionContext>
              <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                  <React.Fragment>
                    <CssBaseline>
                      {props.children}
                    </CssBaseline>
                  </React.Fragment>
                </ThemeProvider>
              </AppRouterCacheProvider>
              <Toaster
                  closeButton
                  richColors
                  position="bottom-right"
              />
        </SessionContext>
      </body>
    </html>
  );
}
