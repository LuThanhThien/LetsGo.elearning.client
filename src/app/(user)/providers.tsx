import { UserProvider } from "@/@core/index.provider";


export default function UserProviders({children} : {children: React.ReactNode}) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}