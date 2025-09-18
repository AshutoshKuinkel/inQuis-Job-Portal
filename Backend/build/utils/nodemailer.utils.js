"use strict";
// import nodemailer from "nodemailer";
// import "dotenv/config";
// import CustomError from "../middlewares/error-handler.middleware";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// console.log(process.env.SMTP_HOST)
// console.log(process.env.SMTP_SERVICE)
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: Number(process.env.SMTP_PORT) === 465 ? true : false,
//   service: process.env.SMTP_SERVICE,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });
// type mailOption = {
//   to: string;
//   subject: string;
//   html: string;
//   cc?: string | string[] | null;
//   bcc?: string | string[] | null;
//   attachments?: [] | null;
// };
// export const sendEmail = async ({
//   to,
//   subject,
//   html,
//   cc = null,
//   bcc = null,
//   attachments = null,
// }: mailOption) => {
//   try {
//     let message: Record<string, any> = {
//       from: `inQuis Job Portal <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       html,
//     };
//     if (cc) message.cc = cc;
//     if (bcc) message.bcc = bcc;
//     if (attachments) message.attachments = attachments;
//     await transporter.sendMail(message);
//   } catch (err) {
//     console.log(err);
//     throw new CustomError("Error sending email", 500);
//   }
// };
const brevo_1 = require("@getbrevo/brevo");
require("dotenv/config");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not set in .env");
}
const apiInstance = new brevo_1.TransactionalEmailsApi();
apiInstance.setApiKey(brevo_1.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
const sendEmail = async ({ to, subject, html, cc = null, bcc = null, attachments = null, }) => {
    try {
        const sendSmtpEmail = new brevo_1.SendSmtpEmail(); // ✅ No arguments
        // Set properties
        sendSmtpEmail.sender = { name: "InQuis Job Portal", email: process.env.BREVO_SENDER };
        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = html;
        if (cc)
            sendSmtpEmail.cc = Array.isArray(cc) ? cc.map(e => ({ email: e })) : [{ email: cc }];
        if (bcc)
            sendSmtpEmail.bcc = Array.isArray(bcc) ? bcc.map(e => ({ email: e })) : [{ email: bcc }];
        if (attachments)
            sendSmtpEmail.attachment = attachments;
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent:", data);
    }
    catch (err) {
        console.error("Error sending email:", err);
        throw new error_handler_middleware_1.default("Error sending email", 500);
    }
};
exports.sendEmail = sendEmail;
