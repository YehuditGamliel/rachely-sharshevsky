
import nodemailer from 'nodemailer';
import fs from 'fs';
export const sendStyledEmail = (emailAddress, emailBody, params) => {
  console.log(emailAddress, emailBody, params)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    }
  });

  const styledEmailContent = fs.readFileSync('C:\\Users\\The user\\rachely-sharshevsky-11\\server\\templates\\templates.html', 'utf8');
  const replacedEmailContent = styledEmailContent.replace('${emailBody}', emailBody).replace('${params}', params).replace('${mail}', process.env.MAIL_EMAIL);
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
};


