import { EnumStyle } from "@/@share/lib/style";

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
 