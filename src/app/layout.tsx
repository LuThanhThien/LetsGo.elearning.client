import { interRegular } from "../@share/lib/font";
import { Metadata } from "next";
import CssBaseline from '@mui/material/CssBaseline'
import {Toaster} from "sonner";

import React from "react";
import "./globals.css"
import AppProviders from "./providers";

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
        <AppProviders>
          <React.Fragment>
            <CssBaseline>
                {props.children}
            </CssBaseline>
          </React.Fragment>
          <Toaster
              closeButton
              richColors
              position="bottom-right"
          />
        </AppProviders>
      </body>
    </html>
  );
}
