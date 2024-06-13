"use client"
import { SessionProvider } from "next-auth/react";

type Props = Readonly<{
    children: React.ReactNode;
  }>;

//   https://javascript.plainenglish.io/seamless-authentication-and-authorization-in-nextjs-leveraging-external-jwts-in-next-auth-1af1ef8fd7d8
  
export function SessionContext(props : Props) {
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    );
}