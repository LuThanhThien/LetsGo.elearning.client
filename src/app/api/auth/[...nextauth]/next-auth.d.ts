import { Role } from "@/dto/Auth";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultUser } from "next-auth";
import { PaymentDto } from "@/dto/Payment";
import { EnrollmentDto } from "@/dto/Enrollment";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: DefaultSession['user'] &  {
			id?: number,
			username?: string,
			fullName?: string,
			birthDate?: Date,
			gender?: string,
			phone?: string,
			location?: string,
			school?: string,
			avatar?: string,
			role?: Role,
			dataStatus?: string,
			accessToken?: string,
			refreshToken?: string,
			createdDatetime?: Date,
			lastLoginAt?: Date,
		};
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
