"use client"
import { UserProvider } from "@/@core/index.provider";
import { ThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import theme from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { elGR } from "@mui/x-date-pickers/locales";
interface Props {
    children: React.ReactNode;
}

export default function AppProviders({ children } : Props) {
  return (
    <SessionProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'vi'}
            localeText={
                elGR.components.MuiLocalizationProvider.defaultProps.localeText
            }
        >
            <UserProvider>
              {children}
            </UserProvider>

          </LocalizationProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}