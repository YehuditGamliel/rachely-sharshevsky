

import { LoginService } from '../service/loginService.js'
// //import { sha512, sha384, sha512_256, sha512_224 } from 'js-sha512';
// //imconst { encrypt, compare } = require('../services/crypto');

 export class LoginController {
    async AuthenticationForSignUpOrLogin(req, res, next) {
        const loginService = new LoginService();
        if(req.body.email==undefined)
            {
                try {      
                    const loginService = new LoginService();
                    const resultItems = await loginService.Authentication(req.body)
                    if (resultItems[0]==true) {
                        return res.cookie('x-access-token', resultItems.token, { httpOnly: true }).json({ status: 200,email:resultItems[3] ,role: resultItems[2],token:resultItems.token });
                        //return res.status(200).json({ status: 200, data: resultItems });
                    }
                    else {
                        const err = {}
                        err.statusCode = 400;
                        err.message = "Incorrect data";
                        next(err)
                    }
                }
                catch (ex) {
                    const err = {}
                    err.statusCode = 500;
                    err.message = ex;
                    next(err)
                }
               
            }
            else{
                const { userName } = req.body; 
                console.log(userName,req.body)
               
                 try {
                              
                                // const loginService = new LoginService();
                                const resultItems = await loginService.checkUserName(userName)
                                // const isExisting = await findUserByEmail(email);
                                
                                if (resultItems.length) {
                                   
                                    const err = {}
                                    err.statusCode = 400;
                                    err.message = "Already Exist";
                                    next(err)
                                }
                                   else{
                                    try {
                                 
                                        const newUser = await loginService.createUser(req.body);
                                           res.status(200).json({ status: 200, data: newUser });
                                }
                                catch (ex) {
                                    const err = {}
                                    err.statusCode = 400;
                                    err.message = 'faild in sending email';
                                    next(err)
                                }
            
                                    
                                   } 
                                }  
                        catch (ex) {
                                        const err = {}
                                        err.statusCode = 500;
                                        err.message = ex;
                                        next(err)
                                    }
                  };
            
                 
              
    }
            
    verifyUserName = async (req, res) => {
        const { userName, otp } = req.body;
  
   try{
 
     const loginService = new LoginService();
     const user = await loginService.validateUserSignUp(userName, otp);
     res.status(200).json({ status: 200, data: user });
     
   }
   catch (ex) {
     const err = {}
     err.statusCode = 500;
     err.message = ex;
     next(err)
 }
   
 };
//  async Authentication(req, res, next) {
                     

 
  
  }


// export class LoginController {
          
//     async Authentication(req, res, next) {
//         try {      
//             console.log("😊")      
//             const loginService = new LoginService();
//             const resultItems = await loginService.Authentication(req.body)
//             if (resultItems.userName) {
//                 return res.cookie('x-access-token', resultItems.token, { httpOnly: true }).json({ status: 200, data: resultItems.userName,token:resultItems.token });
//                 //return res.status(200).json({ status: 200, data: resultItems });
//             }
//             else {
//                 const err = {}
//                 err.statusCode = 400;
//                 err.message = "Incorrect data";
//                 next(err)
//             }
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }
//     async AuthenticationManager(req, res, next) {
//         try {      
//             console.log("😊")      
//             const loginService = new LoginService();
//             const resultItems = await loginService.AuthenticationManager(req.body)
//             if (resultItems.email) {
//                 return res.cookie('x-access-token', resultItems.token, { httpOnly: true }).json({ status: 200, data: resultItems.userName,token:resultItems.token });
//                 //return res.status(200).json({ status: 200, data: resultItems });
//             }
//             else {
//                 const err = {}
//                 err.statusCode = 400;
//                 err.message = "Incorrect data";
//                 next(err)
//             }
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }


//     async addUser(req, res, next) {
//         try {
//             console.log("kkkkk")
            
//             const loginService = new LoginService();
//             const resultItem = await loginService.addUser(req.body);
//             res.status(200).json({ status: 200, data: resultItem });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async checkUserName(req, res, next) {
//         try {
//             let userName = req.query.userName;
//             const loginService = new LoginService();
//             const resultItems = await loginService.checkUserName(userName)
//             if (resultItems.length) {
//                 const err = {}
//                 err.statusCode = 400;
//                 err.message = "Already Exist";
//                 next(err)
//             }
//             else {

                
//                 return res.status(200).json({ status: 200 });
//             }
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }
//     async updatePassword(req, res, next) {
//         try {
//             let id = req.body.userId;
//             delete req.body.userId;
//             const loginService = new TableService();
//             await loginService.updateObject("passwords", "userId", id, req.body)
//             res.status(200).json({ status: 200 });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

// }