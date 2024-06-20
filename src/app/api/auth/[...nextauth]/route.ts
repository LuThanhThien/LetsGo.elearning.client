
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { AuthAPI, getUserByUsername } from "../actions";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import { RestApi } from "../../rest";


export enum NextAuthProviders {
    GOOGLE = "google",
    CREDENTIALS = "credentials",
    REGISTER = "register",
}

const authOptions : AuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: NextAuthProviders.CREDENTIALS,
            credentials: {
                username: {label: "Email", type: "text", placeholder: "username@letsgo.com",},
                password: {label: "Password", type: "password"},
            },
            //@ts-ignore
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Vui lòng nhập tên người dùng và mật khẩu");
                }
                const res = await fetch(RestApi.createUrl(AuthAPI.LOGIN.url), {
                    method: AuthAPI.LOGIN.method,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        username: credentials.username,
                        password: credentials.password
                    })
                });
                if (!res.ok) {
                    throw new Error("Tên người dùng hoặc mật khẩu không chính xác");
                }
                const user = await res.json();
                console.log("Login response: ", user)
                if (user) { return user; }
                return null;
            },
        }),
        CredentialsProvider({
            name: NextAuthProviders.REGISTER,
            credentials: {
                fullName: {label: "Full Name", type: "text", placeholder: "Nguyễn Văn A"},
                username: {label: "Email", type: "text", placeholder: "username@letsgo.vn",},
                password: {label: "Password", type: "password"},
                confirmPassword: {label: "Confirm Password", type: "password"},
                avatar: {label: "Avatar", type: "text"},
            },
            //@ts-ignore
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Vui lòng nhập tên người dùng và mật khẩu");
                }
                const res = await fetch(RestApi.createUrl(AuthAPI.REGISTER.url), {
                    method: AuthAPI.REGISTER.method,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        fullName: credentials.fullName,
                        username: credentials.username,
                        password: credentials.password,
                        confirmPassword: credentials.confirmPassword,
                        avatar: credentials.avatar,
                    })
                });
                if (!res.ok) {
                    throw new Error("Tên người dùng hoặc mật khẩu không chính xác");
                }
                const user = await res.json();
                if (user) { return user; }
                return null;
            },
        }),
    ],
    pages: {    
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({user, account, profile, credentials}) {
            if (account?.provider === NextAuthProviders.CREDENTIALS) {
                console.log("[NextAuth] signIn - Find by credentials: ", credentials)
                const existingUser = await getUserByUsername(credentials?.username as string);
                return Boolean(existingUser.data);
            }
            if (account?.provider === NextAuthProviders.GOOGLE) {
                const existingUser = await getUserByUsername(profile?.email as string);
                return Boolean(existingUser.data);
            }
            return false;
        },
        async jwt({ token, user, session }) : Promise<any> {
            if (user?.username) {
                console.log("[NextAuth] jwt - Find by user: " + JSON.stringify(user))
                console.log("[NextAuth] jwt - Find by user.username: " + user.username)
                const result = await getUserByUsername(user.username as string);
                console.log("[NextAuth] jwt - Existing user: " + JSON.stringify(result.data))
                token = {
                    ...token,
                    ...result.data,
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                }
            }
            return ({...token, ...user});
        },
        async session({session, token, user}) {
            session.user = token;
            if (token?.username) {
                console.log("[NextAuth] session - Find by token: " + JSON.stringify(token))
                console.log("[NextAuth] session - Find by token username: " + token.username)
                const result = await getUserByUsername(token.username as string);
                console.log("[NextAuth] session - Existing user: " + JSON.stringify(result.data))
                session.user = {
                    ...session.user,
                    ...result.data,
                    accessToken:  token.accessToken,
                    refreshToken:  token.refreshToken,
                }
            }
            console.log("[NextAuth] session - session: ", session)
            return session;
        },
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }