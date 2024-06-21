import { z } from "zod"



export const UserUpdateSchema = z.object({
    username: z.string().email({message: "Email không hợp lệ"}),
    fullName:  z.string()
        .min(1, { message: "Họ và tên không được để trống" })
        .max(255, { message: "Họ và tên không dài quá 255 ký tự" }),
    birthDate: z.date({message: "Ngày sinh không hợp lệ"})
        .min(
            new Date(new Date().setFullYear(new Date().getFullYear() - 100)),
            { message: "Ngày sinh không hợp lệ" }
            )
        .max(new Date(), { message: "Ngày sinh không hợp lệ" }).nullable().optional(),
    gender: z.string().nullable().optional(),
    phone: z.string()
        .max(15, { message: "Số điện thoại dài tối đa 15 ký tự"}).nullable().optional(),
    location: z.string()
        .max(255, { message: "Không dài quá 255 ký tự"}).nullable().optional(),
    school: z.string()
        .max(255, { message: "Không dài quá 255 ký tự"}).nullable().optional(),
    avatar: z.string().nullable().optional(),
 })
 
export const ChangePasswordSchema = z.object({
    username: z.string().email({message: "Email không hợp lệ"}),
    currentPassword: z.string()
        .min(1, {message: "Vui lòng nhập mật khẩu hiện tại"})
        .max(255, {message: "Mật khẩu không dài quá 255 ký tự"}),
    newPassword: z.string()
        .min(8, {message: "Mật khẩu phải có ít nhất 8 ký tự"})
        .max(255, {message: "Mật khẩu không dài quá 255 ký tự"}),
    confirmPassword: z.string()
        .min(1, {message: "Vui lòng nhập mật khẩu xác nhận"})
        .max(255, {message: "Mật khẩu không dài quá 255 ký tự"}),
})


export type UserUpdateDto = z.infer<typeof UserUpdateSchema>
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>
