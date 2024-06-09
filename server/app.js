import express from 'express';
import { userRouter } from './router/userRouter.js'
import { eyeglassesRouter } from './router/eyeglassesRouter.js'
import {eyesDataRouter} from './router/eyesDataRouter.js'
import {logErrors} from './middleware/logError.js';
import {loginRouter} from './router/logInRouter.js'
import { purchaseRouter } from './router/purchaseRouter.js';
import { verifyToken } from './middleware/verifyToken.js';

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "*");
    next();
}
  
const app = express();
app.use(express.json());
app.use(allowCrossDomain);

app.use('/users', userRouter);
app.use('/eyeglasses', eyeglassesRouter);
app.use('/eyesData', eyesDataRouter);
app.use('/authorization',loginRouter);
app.use('/purchase',purchaseRouter);

app.use(verifyToken);
app.use(logErrors);


app.listen(8082, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8082);
});
