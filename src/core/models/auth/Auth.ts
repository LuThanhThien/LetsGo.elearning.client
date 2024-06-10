import { EnumStyle } from "../../lib/style";
import { DataStatus } from "../../lib/avatar";

export type AuthResponse = {
   id: number,
   username: string,
   fullName: string,
   birthDate: Date,
   gender: string,
   phone: string,
   location: string,
   school: string,
   avatar: string,
   dataStatus: DataStatus,
   role: Role,
   accessToken: string | null,
   refreshToken: string | null,
   createdDatetime: Date,
   lastLoginDatetime: Date,
}

export enum Role {
   ADMIN = "ADMIN",
   STAFF = "STAFF",
   USER = "USER",
   ANONYMOUS = "ANONYMOUS",
}

export const RoleStyles: Record<Role, EnumStyle> = {
   [Role.ADMIN]: { color: "error" },
   [Role.STAFF]: { color: "info" },
   [Role.USER]: { color: "success" },
   [Role.ANONYMOUS]: { color: "warning" },
}

