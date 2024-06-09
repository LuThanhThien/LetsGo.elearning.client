import { z } from "zod";

export type AuthResponse = {
   id: number,
   username: string,
   fullName: string,
   role: Role,
   accessToken: string | null,
   refreshToken: string | null,
}

export enum Role {
   ADMIN = "ADMIN",
   CONTRIBUTOR = "CONTRIBUTOR",
   USER = "USER",
   ANONYMOUS = "ANONYMOUS",
}

export const LoginSchema = z.object({
   username: z.string().emailTemplate({message: "Email nhập không hợp lệ."}),
   password: z.string()
      .min(8, {message: "Mật khẩu chứa ít nhất 8 ký tự.",})
      .max(30, {message: "Mật khẩu chứa tối đa 30 ký tự.",}),
})

export const RegisterSchema = z.object({
   fullName: z.string()
      .trim()
      .min(1, {message: "Họ và tên không được để trống.",})
      .refine(value => {
         return /^[\p{L} \u0300-\u036F]+$/u.test(value ?? "");
      }, { message: "Tên chỉ được bao gồm ký tự chữ, khoảng trắng."}),
   username: z.string().emailTemplate({message: "Email nhập không hợp lệ."})
      .min(5, {message: "Email đăng nhập chứa tối thiểu 5 ký tự."})
      .max(255, {message: "Email đăng nhập chứa tối đa 255 ký tự."}),
   password: z.string()
      .min(8, {message: "Mật khẩu chứa ít nhất 8 ký tự.",})
      .max(30, {message: "Mật khẩu chứa tối đa 30 ký tự.",}),
   confirmPassword: z.string(),
   avatar: z.string().optional(),
})

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;