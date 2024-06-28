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
          p {
            
           font-family: Arial, sans-serif;
           font-size: 30px;
             text-align: right;

          }
          h1 {
          font-family: Arial, sans-serif;
           color: #41c1ba;
             text-align: right;

          }
          header {
            font-size: 60px;
             text-align: right;
              background-color: #f9f9f9;
            color: #333;
            padding: 20px;
          }
        </style>
      </head>
      
      <body>
      <img src="${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV7O1samPbhPQ7BdbWItMidc47gFHvQMXnqd7Sd_Vt&s'}" alt="Image" style="max-width: 100%;" />
         <header>ברוכים הבאים לEyeCenter רשת אופטיקה המובילה בישראל</header>
 
       <h1>${emailBody}${params}</h1>
        <p> נשמח לשרת אתכם במידה ונתקלתם בבעיה נא ליצור קשר :0583261047 או במייל ${process.env.MAIL_EMAIL}</p>
      </body>
    </html>
  `;

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