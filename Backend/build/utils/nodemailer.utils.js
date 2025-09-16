"use strict";
// import nodemailer from 'nodemailer';
// import 'dotenv/config';
// import CustomError from '../middlewares/error-handler.middleware';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port:Number(process.env.SMTP_PORT),
//   secure:Number(process.env.SMTP_PORT) === 465 ? true : false,
//   service:process.env.SMTP_SERVICE,
//   auth:{
//     user:process.env.SMTP_USER,
//     pass:process.env.SMTP_PASSWORD,
//   }
// })
// type mailOption = {
//   to:string,
//   subject:string,
//   html:string,
//   cc?:string | string[] | null,
//   bcc?:string | string[] | null,
//   attachments?:[] | null,
// }
// export const sendEmail = async({to,subject,html,cc=null,bcc=null,attachments=null}:mailOption) =>{
// try{
//   let message:Record<string,any> = {
//     from:`inQuis Job Portal <${process.env.SMTP_USER}>`,
//     to,
//     subject,
//     html
//   }
//   if(cc){
//     message['cc'] = cc
//   }
//   if(bcc){
//     message['bcc'] = bcc
//   }
//   if(attachments){
//     message['attachments'] = attachments
//   }
//   await transporter.sendMail(message).catch((error) => {
//   console.error("Email failed to send:", error);
//   throw new CustomError('Error sending email', 500);
// });
// }catch(err){
//   throw new CustomError('Error sending email',500)
// }
// } 
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465 ? true : false,
    // service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});
const sendEmail = async ({ to, subject, html, cc = null, bcc = null, attachments = null }) => {
    try {
        let message = {
            from: `inQuis Job Portal <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        };
        if (cc)
            message.cc = cc;
        if (bcc)
            message.bcc = bcc;
        if (attachments)
            message.attachments = attachments;
        // Promise wrapper so function won’t end until email is sent
        const info = await new Promise((resolve, reject) => {
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.error("Email failed to send:", err);
                    reject(new error_handler_middleware_1.default("Error sending email", 500));
                }
                else {
                    resolve(info);
                }
            });
        });
        return info; // return nodemailer response (messageId, accepted, rejected, etc.)
    }
    catch (err) {
        throw new error_handler_middleware_1.default('Error sending email', 500);
    }
};
exports.sendEmail = sendEmail;
