

import { LoginService } from '../service/loginService.js'
import { userSchema } from '../validateData/validateUser.js';
// //import { sha512, sha384, sha512_256, sha512_224 } from 'js-sha512';
// //imconst { encrypt, compare } = require('../services/crypto');

export class LoginController {

    async Authentication(req, res, next){
        try {
            const loginService = new LoginService();
            const result = await loginService.Authentication(req.body)
            if (result.verifyPassword == true) {
                  return res.cookie('x-access-token', result.token, { httpOnly: true }).json({ status:200, email: result.email, role: result.role, token: result.token });
            }
        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        } 
    }

    async addUser(req, res, next){
        const {error} = userSchema.validate(req.body)
        if(error){
            res.status(400).json({ status: 400, error: "Incorrect data" })
        }
        try {
            const loginService = new LoginService();
            const user = await loginService.checkUserName(req.body)
                if (user.length) {
                    res.status(400).json({ status: 400, error: "Already Exist" })
                }
                else {
                    const newUser = await loginService.createUser(req.body);
                    if(newUser){
                        res.status(200).json({ status: 200, data: newUser });
                    }
                    res.status(400).json({ status: 401, error: "faild in sending email" })
                }
        }
        catch (ex) {
                const err = {}
                err.statusCode = 500;
                err.message = ex;
                next(err)
            }
        }

        verifyUserName = async (req, res) => {
            const { userName, otp } = req.body;
            try {
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
    
    async updatePassword(req, res, next) {
        try {
            const loginService = new LoginService();
            const result = await loginService.updatePassword(req.body)
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
