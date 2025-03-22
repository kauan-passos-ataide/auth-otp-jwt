import { RequestHandler } from "express";
import { getUserByEmail } from "../services/user";

export const test: RequestHandler = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
    }

    const user = await getUserByEmail(email);

    if (!user) {
        res.status(404).json({ error: 'Unauthorized access' });
        return;
    }

    res.json({ user });
}