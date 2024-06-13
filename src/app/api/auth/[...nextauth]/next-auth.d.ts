import { Role } from "@/@core/models/Auth";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultUser } from "next-auth";
import { PaymentModel } from "@/@core/models/user/Payment";
import { EnrollmentModel } from "@/@core/models/user/Enrollment";
import { UserModel } from "@/@core/models/user/User";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: DefaultSession['user'] &  UserModel;
	}

	interface DefaultUser {
		id?: number,
		username?: string,
		role?: Role,
	}
}


declare module "next-auth/jwt" {
	interface JWT {
		id?: number,
		username?: string,
		fullName?: string,
		role?: Role,
		accessToken?: string,
		refreshToken?: string,
	}
}
