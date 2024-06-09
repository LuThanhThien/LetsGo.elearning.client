import {NextRequest, NextResponse} from 'next/server'
import {getToken} from 'next-auth/jwt'
import { AuthorityPatterns } from './app/api/const'
import { Role } from './dto/Auth'

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
        if (!session) {
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
        // Check user role
        const userRole = session?.role ? session.role : Role.ANONYMOUS
        // Get object from AuthorityPatterns
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