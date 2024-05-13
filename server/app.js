import express from 'express';
import { userRouter } from './router/userRouter.js'
import { eyeglassesRouter } from './router/eyeglassesRouter.js'
// import { postRouter } from './router/eyeGlassesRouter.js';
// import {logErrors} from './middleware/logError.js';
// import {loginRouter} from './router/logInRouter.js'
// let allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers', "*");
//     res.header('Access-Control-Allow-Methods', "*");
//     next();
//   }
  
const app = express();
 app.use(express.json());
 console.log("eee")
// app.use(allowCrossDomain);
// app.use('/authorization',loginRouter);
app.use('/users', userRouter);
 app.use('/eyeglasses', eyeglassesRouter);
// app.use('/todos', todoRouter);
//app.use(logErrors);


app.listen(8082, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8082);
});