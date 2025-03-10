import jwt from 'jsonwebtoken'
import 'dotenv/config';
import { RequestHandler } from 'express';

export const createJWT = (id: number) => {
    const payload = { id };
    return jwt.sign(payload, process.env.JWT_TOKEN as string, { expiresIn: '15 days' });
}

export const verifyJWT: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_TOKEN as string,
        (err, decoded: any) => {
            if(err) {
                res.status(500).json({ error: "Authentication failed"})
                return;
            }
            next();
        }
    )
}