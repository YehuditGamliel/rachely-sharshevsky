import { executeQuery } from './db.js';
import {addQuery,getUserByEmailQuery} from './queries.js'

export class UserService {

    async addUser(itemDetailes) {
        const query = addQuery('users',Object.keys(itemDetailes));
        console.log(query)
        const result = await executeQuery(query, Object.values(itemDetailes));
        console.log(result)
        return result;

    }

    async getUserByEmail(itemDetailes) {
        const query =  getUserByEmailQuery();
        const obj = Object.values(itemDetailes)
        console.log("obj  "+obj)
        const result = await executeQuery(query,Object.values(itemDetailes));
        return result; 
    }

}