import { z } from "zod";


export const LoginSchema = z.object({
   username: z.string().email({message: "Email nhập không hợp lệ."}),
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
   username: z.string().email({message: "Email nhập không hợp lệ."})
      .max(255, {message: "Email đăng nhập chứa tối đa 255 ký tự."}),
   password: z.string()
      .min(8, {message: "Mật khẩu chứa ít nhất 8 ký tự.",})
      .max(30, {message: "Mật khẩu chứa tối đa 30 ký tự.",}),
   confirmPassword: z.string().min(1, {message: "Mật khẩu xác nhận không được để trống."}),
   avatar: z.string().optional(),
})

 export const ForgorPasswordSchema = z.object({
   username: z.string().email({message: "Email nhập không hợp lệ."})
 });
 
export const ResetPasswordOTPSchema = z.object({
   username: z.string().email({message: "Email nhập không hợp lệ."}),
   providedOtp: z.string().min(1, {message: "Mã OTP không được để trống."}),
   resetPassword: z.string()
   .min(8, {message: "Mật khẩu chứa ít nhất 8 ký tự.",})
   .max(30, {message: "Mật khẩu chứa tối đa 30 ký tự.",}),
   confirmPassword: z.string().min(1, {message: "Mật khẩu xác nhận không được để trống."}),
})

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgorPasswordSchema>
export type ResetPasswordOTPDto = z.infer<typeof ResetPasswordOTPSchema>;