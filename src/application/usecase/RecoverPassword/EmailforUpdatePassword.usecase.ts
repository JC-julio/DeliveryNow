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
        subject: 'Recuperação de senha do DeliveryNow - não responda este email.',
        text: 'O código para redefinir sua senha é: ' + props.code + '\n' + ' A equipe do DeliveryNow jamais vai pedir sua senha ou informações confidenciais fora do aplicativo, não forneça este código para ninguém.'
    };
    return await transporter.sendMail(mailOptions);
    }
}

export type Input = {
    email: string,
    code: string,
}