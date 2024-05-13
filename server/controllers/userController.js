

import { TableService } from '../service/service.js'
export class UserController {
    static tableName = "users";
    // {console.log("p")};
    static columns = 'userName';
    async getUserById(req, res, next) {
        console.log("pppppppppp")
        try {
            console.log("pppppppppp")
            const userService = new TableService();
            const resultItem = await userService.getById(UserController.tableName, UserController.columns, req.params.id=1);
            res.status(200).json({ status: 200, data: resultItem });
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

            const userService = new TableService();
            let user = req.body;
            let addPassword = user.password;
            delete user.password;
            let resultItem = await userService.addObject(UserController.tableName, user);
            await userService.addObject("passwords", { 'password': addPassword, 'userId': resultItem.insertId });
            res.status(200).json({ status: 200, data: resultItem.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteUser(req, res, next) {
        console.log("ppp")
        try {
            const userService = new TableService();
            await userService.deleteObject(UserController.tableName, req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res, next) {
        try {
            const userService = new TableService();
            await userService.updateObject(UserController.tableName, req.params.id, req.body);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }




}