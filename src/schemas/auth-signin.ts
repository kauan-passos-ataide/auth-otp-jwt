import { z } from "zod";

export const authSignInSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido'})
})

export const authSignUpSchema = z.object({
    name: z.string({ message: 'Campo nome é obrigatório'}),
    email: z.string().email({ message: 'E-mail inválido'})
})

export const authVerifyOtpSchema = z.object({
    otp: z.string().min(6, { message: 'O código de verificação precisa ter 6 dígitos'}),
    id: z.string()
})