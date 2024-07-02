

import { RoleService } from '../service/roleService.js'
export class RoleController {

    async getAllRoles(req, res, next) {
        try {
            console.log("😊")
            const roleService = new RoleService();
            const resultItem = await roleService.getAllRoles(req.body);
            console.log("😊",resultItem)
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    
   


}