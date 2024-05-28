
import { executeQuery } from './db.js';
import {getByValues, updateQuery, deleteQuery, addQuery, getAllQuery, AuthenticationQuery } from './queries.js'
export class LoginService {

           
    async Authentication(data) {
        console.log("ppp",Object.values(data))
        const query = getByValues('users','userName',['email','password']);
        const result = await executeQuery(query, Object.values(data));
        return result;
    }
 
}