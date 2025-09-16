// import nodemailer from 'nodemailer';
// import 'dotenv/config';
// import CustomError from '../middlewares/error-handler.middleware';

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

import nodemailer from 'nodemailer';
import 'dotenv/config';
import CustomError from '../middlewares/error-handler.middleware';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465 ? true : false,
  // service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // tls:{
  //   rejectUnauthorized:false
  // }
});

type mailOption = {
  to: string,
  subject: string,
  html: string,
  cc?: string | string[] | null,
  bcc?: string | string[] | null,
  attachments?: [] | null,
};

export const sendEmail = async ({ to, subject, html, cc = null, bcc = null, attachments = null }: mailOption) => {
  try {
    let message: Record<string, any> = {
      from: `inQuis Job Portal <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    };

    if (cc) message.cc = cc;
    if (bcc) message.bcc = bcc;
    if (attachments) message.attachments = attachments;

    // Promise wrapper so function won’t end until email is sent
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.error("Email failed to send:", err);
          reject(new CustomError("Error sending email", 500));
        } else {
          resolve(info);
        }
      });
    });

    return info; // return nodemailer response (messageId, accepted, rejected, etc.)
  } catch (err) {
    throw new CustomError('Error sending email', 500);
  }
};
