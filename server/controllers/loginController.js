

import { LoginService } from '../service/loginService.js'
import { sha512, sha384, sha512_256, sha512_224 } from 'js-sha512';
export class LoginController {
          
    async Authentication(req, res, next) {
        try {
            {console.log("loginController")}
            
            console.log(req.body)
            const loginService = new LoginService();
            const resultItems = await loginService.Authentication(req.body)
            
            if (resultItems.length) {
                return res.status(200).json({ status: 200, data: resultItems });
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


    async addUser(req, res, next) {
        try {
            const loginService = new LoginService();
            const resultItem = await loginService.addUser(req.body);
            console.log(resultItem);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async checkUserName(req, res, next) {
        try {
            let userName = req.query.userName;
            const loginService = new TableService();
            const resultItems = await loginService.checkUserName(userName)
            if (resultItems.length) {
                const err = {}
                err.statusCode = 400;
                err.message = "Already Exist";
                next(err)
            }
            else {
                return res.status(200).json({ status: 200 });
            }
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async updatePassword(req, res, next) {
        try {
            let id = req.body.userId;
            delete req.body.userId;
            const loginService = new TableService();
            await loginService.updateObject("passwords", "userId", id, req.body)
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