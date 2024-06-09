
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserByUsername } from "@/app/api/user/actions";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import { AuthAPI, RequestMethod } from "@/app/api/const";
import { createUrl } from "../../axios";


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
                emailTemplate: {label: "Email", type: "text", placeholder: "emailTemplate@letsgo.com",},
                password: {label: "Password", type: "password"},
            },
            //@ts-ignore
            async authorize(credentials) {
                if (!credentials?.emailTemplate || !credentials?.password) {
                    throw new Error("Vui lòng nhập tên người dùng và mật khẩu");
                }
                const res = await fetch(createUrl(AuthAPI.LOGIN), {
                    method: RequestMethod.POST,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        username: credentials.emailTemplate,
                        password: credentials.password
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
        CredentialsProvider({
            name: NextAuthProviders.REGISTER,
            credentials: {
                fullName: {label: "Full Name", type: "text", placeholder: "Nguyễn Văn A"},
                emailTemplate: {label: "Email", type: "text", placeholder: "emailTemplate@letsgo.vn",},
                password: {label: "Password", type: "password"},
                confirmPassword: {label: "Confirm Password", type: "password"},
                avatar: {label: "Avatar", type: "text"},
            },
            //@ts-ignore
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Vui lòng nhập tên người dùng và mật khẩu");
                }
                const res = await fetch(createUrl(AuthAPI.REGISTER), {
                    method: RequestMethod.POST,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        fullName: credentials.fullName,
                        username: credentials.emailTemplate,
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
        async signIn({user, account, profile, emailTemplate, credentials}) {
            if (account?.provider === NextAuthProviders.CREDENTIALS) {
                const existingUser = await getUserByUsername(credentials?.emailTemplate as string);
                return Boolean(existingUser.data);
            }
            if (account?.provider === NextAuthProviders.GOOGLE) {
                const existingUser = await getUserByUsername(profile?.emailTemplate as string);
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
                    id: result.data.id,
                    username: result.data.username,
                    fullName: result.data.fullName,
                    role: result.data.role,
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
                    id: result.data.id,
                    username:  result.data.username,
                    fullName:  result.data.fullName,
                    birthDate:  result.data.birthDate,
                    gender:  result.data.gender,
                    phone:  result.data.phone,
                    location:  result.data.location,
                    school:  result.data.school,
                    avatar:  result.data.avatar,
                    role:  result.data.role,
                    dataStatus:  result.data.dataStatus,
                    accessToken:  token.accessToken,
                    refreshToken:  token.refreshToken,
                    createdDatetime:  result.data.createdDatetime,
                    lastLoginAt:  result.data.lastLoginAt,
                }
            }
            return session;
        },
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }