import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { getUserByEmail } from "../services/user";

export const test = async (req: ExtendedRequest, res: Response) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ error: 'Email não fornecido' });
        return;
    }

    const user = await getUserByEmail(email);

    if (!user) {
        res.status(404).json({ error: 'Acesso negado' });
        return;
    }

    res.json({ user });
}