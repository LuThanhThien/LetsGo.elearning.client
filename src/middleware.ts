import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { Role } from './@core/index.models'


export class AuthorityPatterProvider  {
    pattern: string;
    roles: Role[];
 
    constructor(pattern: string, roles: Role[]) {
       this.pattern = pattern;
       this.roles = roles;
    }
}
 
 export const AuthorityPatterns = [
    new AuthorityPatterProvider("/dashboard/admin/*", [Role.ADMIN]),
    new AuthorityPatterProvider("/dashboard/*", [Role.ADMIN, Role.STAFF]),
    new AuthorityPatterProvider("/user/*", [Role.USER, Role.ADMIN, Role.STAFF]),
]

export async function middleware(req: NextRequest) {
    // Token from request
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    })
    const {pathname} = req.nextUrl
    const isCheckAuth = AuthorityPatterns.find(api => pathname.match(api.pattern))
    if (isCheckAuth) {
        console.log("Check auth: ", isCheckAuth)
        console.log("Session: ", session)
        if (!session) {
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
        // Check user role
        const userRole = session?.role ? session.role : Role.ANONYMOUS
        // Get object from AuthorityPatterns
        console.log("User role: ", userRole)
        const requestRole = isCheckAuth.roles;
        // Check if user has role
        const hasRole = requestRole.includes(userRole)
        if (!hasRole) {
            //APi return 403
            const url = req.nextUrl.clone()
            url.pathname = '/403'
            return NextResponse.redirect(url)
        }
        return NextResponse.next()
    }
    return NextResponse.next()
}