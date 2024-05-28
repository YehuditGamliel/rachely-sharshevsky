
import { executeQuery } from './db.js';
import {getByValues, updateQuery, deleteQuery, addQuery, getAllQuery, AuthenticationQuery } from './queries.js'
export class LoginService {

           
    async Authentication(data) {
        console.log("ppp",Object.values(data))
        const query = getByValues('users','userName',['email','password']);
        const result = await executeQuery(query, Object.values(data));
        return result;
    }

    async addUser(itemDetailes) {
        const query = addQuery('users',Object.keys(itemDetailes));
        console.log("query"+query);
        const result = await executeQuery(query, Object.values(itemDetailes));
        console.log(result)
        return result;

    }

 
}