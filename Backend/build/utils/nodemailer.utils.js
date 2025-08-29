"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465 ? true : false,
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
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
        if (cc) {
            message['cc'] = cc;
        }
        if (bcc) {
            message['bcc'] = bcc;
        }
        if (attachments) {
            message['attachments'] = attachments;
        }
        await transporter.sendMail(message);
    }
    catch (err) {
        throw new error_handler_middleware_1.default('Error sending email', 500);
    }
};
exports.sendEmail = sendEmail;
