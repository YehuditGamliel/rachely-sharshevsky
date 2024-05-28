import { executeQuery } from './db.js';
import {addQuery,getByValueQuery} from './queries.js'

export class UserService {

    async addUser(itemDetailes) {
        const query = addQuery('users',Object.keys(itemDetailes));
        console.log(Object.keys(itemDetailes));
        const result = await executeQuery(query, Object.values(itemDetailes));
        console.log(Object.values(itemDetailes));
        return result;
    }

    async getUserByEmail(email) {
        const query = getByValueQuery('optics.users');
        const result = await executeQuery(query, [email]);
        return result;
    }

}