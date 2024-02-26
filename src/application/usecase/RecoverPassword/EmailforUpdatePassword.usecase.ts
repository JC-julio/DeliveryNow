import nodemailer from "nodemailer";
import { config } from 'dotenv';
config();

export default class EmailforUpdatePassword {
    constructor() {}
    async execute(props: Input) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password,
        }
    });
    const mailOptions = {
        from: transporter.auth.user,
        to: props.email,
        subject: 'Recuperação de senha do DeliveryNow',
        text: 'O código para redefinir sua senha é: ' + props.code
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}
}

export type Input = {
    email: string,
    code: string,
}