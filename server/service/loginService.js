
import { executeQuery } from './db.js';
import {getByValues,getByValueQuery, addQuery } from './queries.js'
export class LoginService {

           
    async Authentication(data) {
        const query = getByValues('users','userName',['email','password']);
        const result = await executeQuery(query, Object.values(data));
        return result;
    }

    async checkEmail(email){ 
       const query = getByValueQuery('users', 'email', 'userName');
       const result = await executeQuery(query, [email]);
       console.log(result)
       return result;
   }

    async addUser(itemDetailes) {
        const query = addQuery('users',Object.keys(itemDetailes));
        const result = await executeQuery(query, Object.values(itemDetailes));
        return result;
    }
}