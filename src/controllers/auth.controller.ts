import { RequestHandler } from "express";
import { authSignInSchema, authSignUpSchema, authVerifyOtpSchema } from '../schemas/auth-signin';
import { createUser, getUserByEmail } from "../services/user";
import { generateOTP, validateOTP } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { createJWT } from "../libs/jwt";

export const signin: RequestHandler = async (req, res) => {
    const data = authSignInSchema.safeParse(req.body);

    if (!data.success) {
        res.status(400).json({ error: 'Dados inválidos' });
        return;
    }

    const user = await getUserByEmail(data.data.email);

    if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
    }

    const otp = await generateOTP(user.id);

    await sendEmail(
        user.email,
        `Seu código é ${otp.code}`,
        `Olá, ${user.name}. Faça login usando o código: ${otp.code}.`
    )

    res.status(200).json({ id: otp.id });
}

export const signup: RequestHandler = async (req, res) => {
    const data = authSignUpSchema.safeParse(req.body);

    if (!data.success) {
        res.status(400).json({ error: 'Invalid data' });
        return;
    }

    const user = await getUserByEmail(data.data.email);

    if (user) {
        res.status(409).json({ error: 'User already registered' });
        return;
    }

    const newUser = await createUser(data.data.name, data.data.email);

    res.status(201).json({ newUser });
}

export const verifyOTP: RequestHandler = async (req, res) => {
    const data = authVerifyOtpSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: 'Code invalid' });
        return;
    }
    const user = await validateOTP(data.data.id, data.data.otp);
    if (!user) {
        res.status(401).json({ error: 'Code invalid' });
        return;
    }

    const jwt = await createJWT(user.id);
    res.status(200).json({ token: jwt });
}