import nodemailer from 'nodemailer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendStyledEmail = (emailAddress, emailBody, params) => {
  console.log("😒😒😒", emailAddress, emailBody, params);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    }
  });

  try {
    const styledEmailContent = fs.readFileSync(
      path.join(__dirname, 'templates', 'templates.html'),
      'utf8'
    );

    const replacedEmailContent = styledEmailContent
      .replace('${emailBody}', emailBody)
      .replace('${params}', params)
      .replace('${mail}', process.env.MAIL_EMAIL);

    const mailOptions = {
      from: process.env.MAIL_EMAIL,
      to: emailAddress,
      subject: 'EyeCenter',
      html: replacedEmailContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error reading template file:', error);
  }
};
