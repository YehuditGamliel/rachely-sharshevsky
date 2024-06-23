import express from 'express';
import nodemailer from 'nodemailer';
import { userRouter } from './router/userRouter.js';
import { eyeglassesRouter } from './router/eyeglassesRouter.js';
import { eyesDataRouter } from './router/eyesDataRouter.js';
import { logErrors } from './middleware/logError.js';
import { loginRouter } from './router/logInRouter.js';
import {branchRouter} from './router/branchRouter.js'
import { purchaseRouter } from './router/purchaseRouter.js';
import { verifyToken } from './middleware/verifyToken.js';
// import {editingGlassesRouter} from './router/editingGlassesRouter.js'

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "*");
    next();
}

const app = express();
app.use(express.json());
app.use(allowCrossDomain);

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Update with your email service
    auth: {
        user: 'rsh61047@gmail.com', // Update with your email account credentials
        pass: '0583261047'
    }
});

// Sending a basic email without a token
app.post('/send-basic-email', (req, res) => {
    
    const { email, message } = req.body;
    console.log("😂",message,email)

    const mailOptions = {
        from: 'rsh61047@gmail.com',
        to: email,
        subject: 'A Message from Your Application',
        text: message // Simple text message in the email body
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});
app.use('/users', userRouter);
app.use('/eyeglasses', eyeglassesRouter);
app.use('/eyesData', eyesDataRouter);
app.use('/authorization',loginRouter);
app.use('/branch',branchRouter);
//  app.use('/EditingGlasses',editingGlassesRouter)
// app.use(verifyToken);
app.use(logErrors);

app.listen(8082, (err) => {
    console.log("pp")
    if (err) console.error(err);
    console.log("Server listening on PORT", 8082);
});