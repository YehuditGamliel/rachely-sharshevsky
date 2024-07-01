import nodemailer from 'nodemailer';
//  import  {jsonData} from'../client/src/assets/data.json'
import fs from 'fs';

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
  const styledEmailContent = `
  <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          font-size: 16px;
          direction: rtl; /* Right-to-left text direction */
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .title {
          background-color: #41c1ba;
          color: white;
          padding: 10px;
          border-radius: 8px 8px 0 0;
          text-align: center;
          font-size: 20px;
        }
        .letter {
          color: #333;
          text-align: right; /* Align text to the right side */
          font-size: 16px;
          line-height: 1.6;
          padding: 10px;
        }
        .signature {
          text-align: right;
          margin-top: 20px;
          font-style: italic;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="title">  EyeCenter ברוכים הבאים לרשת אופטיקה המובילה בישראל</div>
        <p class="letter">${emailBody}${params}</p>
        <p class="letter">נשמח לשרת אתכם, במידה ונתקלתם בבעיה או צרכים נוספים, אנא אל תהססו ליצור קשר באמצעות המייל ${process.env.MAIL_EMAIL} בטלפון: 0583261047</p>
        
        <p class="signature"> EyeCenter בברכה, צוות </p>
      </div>
    </body>
  </html>`

  // Define the mail options with styled content
  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: emailAddress,
    subject: 'EyeCenter',
    html: styledEmailContent,
   
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