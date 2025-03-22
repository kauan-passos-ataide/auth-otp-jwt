import 'dotenv/config';
import { MailtrapClient } from 'mailtrap';

export const sendEmail = async (to: string, subject: string, body: string) => {
    const client = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN as string,
        testInboxId: 97878789, // colocar id da inbox
        accountId: 978798797 // colocar id da conta
    });

    await client.testing.send({
        from: { name: 'Sistema', email: 'sistema@gmail.com' },
        to: [{ email: to}],
        subject,
        text: body,
    });
}