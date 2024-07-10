import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { eyeglassesRouter } from './router/eyeglassesRouter.js';
import { eyesDataRouter } from './router/eyesDataRouter.js';
import { logErrors } from './middleware/logError.js';
import { enterRouter } from './router/enterRouter.js'
import {branchRouter} from './router/branchRouter.js'
import { purchaseRouter } from './router/purchaseRouter.js';
import { roleRouter } from './router/roleRouter.js';
import { verifyToken } from './middleware/verifyToken.js';
import {invitationRouter} from './router/invitationRoutr.js'

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "*");
    next();
}

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'] ,
    credentials: true
}));

app.use(cookieParser());
app.use('/img', express.static('img'));

app.use('/eyeglasses', eyeglassesRouter);
app.use('/eyesData', eyesDataRouter);
app.use('/authorization',enterRouter);
app.use('/branch',branchRouter);
app.use('/purchase',purchaseRouter)
app.use('/roles',roleRouter)
app.use('/invitation',invitationRouter)

app.use(logErrors);

app.listen(8082, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8082);
});


