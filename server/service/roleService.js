
import { executeQuery } from './db.js';
import {getAllElementsQuery } from '../queries.js/queries.js'
export class RoleService {


    async  getAllRoles() {
        let query = getAllElementsQuery('roles','roleDescription,id')
        const result = await executeQuery(query);
        return result;
    }
}