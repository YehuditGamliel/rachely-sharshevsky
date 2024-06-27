import nodemailer from 'nodemailer';

 export const sendStyledEmail = (emailAddress, emailSubject, emailBody) => {
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
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <h1>${emailSubject}</h1>
        <p>${emailBody}</p>
      </body>
    </html>
  `;

  // Define the mail options with styled content
  const mailOptions = {
    from: 'michalla37@gmail.com',
    to: emailAddress,
    subject: 'Styled Email using Node.js',
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