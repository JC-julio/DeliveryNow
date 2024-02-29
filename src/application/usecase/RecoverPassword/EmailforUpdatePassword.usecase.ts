import nodemailer from "nodemailer";
import { config } from 'dotenv';
config();

export default class EmailforUpdatePassword {
    constructor() {}
    async execute(props: Input) {
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password,
            }
        });
    const mailOptions = {
        from: transporter.transporter.auth.user,
        to: props.email,
        subject: 'Recuperação de senha do DeliveryNow',
        text: 'O código para redefinir sua senha é: ' + props.code
    };
    return await transporter.sendMail(mailOptions);
    }
}

export type Input = {
    email: string,
    code: string,
}