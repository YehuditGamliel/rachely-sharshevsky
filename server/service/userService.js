import { executeQuery } from './db.js';
import {addQuery} from './queries.js'

export class UserService {

    async addUser(itemDetailes) {
        const query = addQuery('users',Object.keys(itemDetailes));
        
        const result = await executeQuery(query, Object.values(itemDetailes));
        return result;

    }
}