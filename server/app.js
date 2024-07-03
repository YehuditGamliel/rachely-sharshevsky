import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import { userRouter } from './router/userRouter.js';
import { eyeglassesRouter } from './router/eyeglassesRouter.js';
import { eyesDataRouter } from './router/eyesDataRouter.js';
import { logErrors } from './middleware/logError.js';
import { loginRouter } from './router/logInRouter.js';
import {branchRouter} from './router/branchRouter.js'
import { purchaseRouter } from './router/purchaseRouter.js';
import { roleRouter } from './router/roleRouter.js';
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
app.use(cookieParser());
app.use(allowCrossDomain);

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // מתודות המורשות
    allowedHeaders: ['Content-Type', 'Authorization'] ,// כותרות מותרות
    credentials: true
}));

app.use(cookieParser());
app.use('/img', express.static('img'));
app.use('/users', userRouter);
app.use('/eyeglasses', eyeglassesRouter);
app.use('/eyesData', eyesDataRouter);
app.use('/authorization',loginRouter);
app.use('/branch',branchRouter);
app.use('/purchase',purchaseRouter)
app.use('/roles',roleRouter)
//  app.use('/EditingGlasses',editingGlassesRouter)
app.use(verifyToken);
app.use(logErrors);

app.listen(8082, (err) => {
    console.log("pp")
    if (err) console.error(err);
    console.log("Server listening on PORT", 8082);
});


// Create a transporter object
// const transporter = nodemailer.createTransport({
// service:'gmail',
//  secure: false, // use SSL
//  auth: {
//  user:'michalla37@gmail.com',
//  pass: 'kqjf zowc lqej cqbi',
// }
// });
// // Configure the mailoptions object
// const mailOptions = {
//  from: 'michalla37@gmail.com',
//  to: 'rsh61047@gmail.com',
//  subject: 'Sending Email using Node.js',
//  text: 'That was easy!'
// };
// // Send the email
// transporter.sendMail(mailOptions, function(error, info){
//  if (error) {
//  console.log('Error:', error);
//  } else {
//  console.log('Email sent:', info.response);
//  }
// });
// Nodemailer setup