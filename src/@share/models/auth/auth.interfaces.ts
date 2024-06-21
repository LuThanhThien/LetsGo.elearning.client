import { DataStatus } from "../global/audit-data.enums";
import { Role } from "./auth.enums";

export interface AuthResponse {
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
