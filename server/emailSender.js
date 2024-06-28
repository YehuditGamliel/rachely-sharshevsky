import nodemailer from 'nodemailer';
//  import  {jsonData} from'../client/src/assets/data.json'
// import {logo}from '../client/src/img/logo.png'
 export const sendStyledEmail = (emailAddress, emailBody,params) => {
  const body=null;
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
      user:'michalla37@gmail.com',
   
      pass: 'kqjf zowc lqej cqbi'
    }
  });

  // Styled email content with inline CSS
  const styledEmailContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            padding: 20px;

          }
          h1 {
            color: #007bff;

          }
          p {
            font-size: 20px;
          }
        </style>
      </head>
      
      <body>
         
        <img src="${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV7O1samPbhPQ7BdbWItMidc47gFHvQMXnqd7Sd_Vt&s'}" alt="Image" style="max-width: 100%;" />
        <h1>${emailBody}${params}</h1>
        <p>${body}</p>
      </body>
    </html>
  `;

  // Define the mail options with styled content
  const mailOptions = {
    from: 'michalla37@gmail.com',
    to: emailAddress,
    subject: 'EyeCenter',
    html: styledEmailContent
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