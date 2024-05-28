

import { UserService } from '../service/userService.js'
export class UserController {

    async getUserByEmail(req, res, next) {
        try {
            const userService = new UserService();
            const resultItem = await userService.getUserByEmail(req.body);
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
            const userService = new UserService();
            const resultItem = await userService.addUser(req.body);
            res.status(200).json({ status: 200, data: resultItem });
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