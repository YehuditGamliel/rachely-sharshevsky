

import { RoleService } from '../service/roleService.js'
export class RoleController {

    async getAllRoles(req, res, next) {
        try {
            const roleService = new RoleService();
            const resultItem = await roleService.getAllRoles(req.body);
            if (resultItem.length != 0) {
                res.status(200).json({ status: 200, data: resultItem });
            }
            else {
                const err = {}
                err.statusCode = 404;
                err.message = ex;
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




}