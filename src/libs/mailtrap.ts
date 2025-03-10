import { MailtrapClient } from "mailtrap"

export const sendEmail = async (to: string, subject: string, body: string) => {
    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN as string,
        testInboxId: 3514665
    });
    try {
        await mailtrap.send({
            from: { name: 'Sistema', email: 'sistema@gmail.com' },
            to: [{ email: to}],
            subject,
            html: body,
            text: body
        });
        return true;
    } catch (err) {
        return false;
    }
}