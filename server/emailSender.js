import nodemailer from 'nodemailer';
//  import  {jsonData} from'../client/src/assets/data.json'
import fs from 'fs';
// import template


import path from 'path'
// Read the logo image file

 export const sendStyledEmail = (emailAddress, emailBody,params) => {
  // const logoPath = "C:\Users\The user\rachely-sharshevsky-11\client\src\img\logo.png"; // Update the path to your logo image
  // const logoData = fs.readFileSync(logoPath);
  // switch(emailType) {
  //   case 'otp':
     
  //     break;
  //   case y:
  //     // code block
  //     break;
  //   default:
  //     // code block
  // }
  
  console.log("begin sending")
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user:process.env.MAIL_EMAIL,
   
      pass: process.env.MAIL_PASSWORD,
    }
  });

  // Styled email content with inline CSS
  
const __dirname = path.resolve();
// console.log(path.resolve(__dirname, './/template//templates.html'))
 const basePathWithDoubleBackslashes = path.resolve(__dirname.replaceAll('\\', '\\\\'), './/template//templates.html')
console.log(basePathWithDoubleBackslashes)
//  const styledEmailContent = fs.readFileSync(basePathWithDoubleBackslashes);
// C:\Users\The user\rachely-sharshevsky-7\server\template\templates.html

   const styledEmailContent = fs.readFileSync('C:\\Users\\The user\\rachely-sharshevsky-7\\server\\templates\\templates.html', 'utf8');
   const replacedEmailContent = styledEmailContent.replace('${emailBody}', emailBody).replace('${params}', params).replace('${mail}', process.env.MAIL_EMAIL);
  // Define the mail options with styled content
  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: emailAddress,
    subject: 'EyeCenter',
    html: replacedEmailContent,
   
  };
  

  // Send the styled email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Example of sending an email with styled content obtained from props
// const emailAddress = 'rsh61047@gmail.com'; // Replace with recipient's email address
// const emailSubject = 'Email Subject';
// const emailBody = 'Example email body content'; // Replace with actual body content from props

// sendStyledEmail(emailAddress, emailSubject, emailBody);