import { prisma } from "../libs/prisma";
import { v4 as uuid } from 'uuid'

export const generateOTP = async (userId: number) => {
    let otpArray: number[] = [];
    for (let i = 0; i < 6; i++) {
        const randomNumber = Math.floor(Math.random() * 9);
        otpArray.push(randomNumber);
    }
    let code = otpArray.join("");
    let expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const otp = await prisma.otp.create({
        data: {
            id: uuid(),
            userId,
            code,
            expiresAt
        }
    })

    return otp;
}

export const validateOTP = async (id: string, code: string) => {
    const otpRecord = await prisma.otp.findFirst({
        where: {
            id,
            code,
            expiresAt: {
                gte: new Date(),
            }
        }
    });

    if (!otpRecord) {
        return false;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: otpRecord.userId
        }
    })

    if (!user) {
        return false;
    }
    
    await prisma.otp.delete({
        where: {
            id: otpRecord.id
        }
    });

    return user;
}