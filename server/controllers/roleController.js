

import { RoleService } from '../service/roleService.js'
export class RoleController {

    async getAllRoles(req, res, next) {
        try {
            const roleService = new RoleService();
            const resultItem = await roleService.getAllRoles();
            res.json({ data: resultItem });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message:ex.message || ex})
        }
    }
}