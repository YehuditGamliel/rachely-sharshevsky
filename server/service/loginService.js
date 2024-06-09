
import { executeQuery } from './db.js';
import {getByValues,getByValueQuery, addQuery } from './queries.js'
import jwt from "jsonwebtoken"
export class LoginService {

           
    async Authentication(data) {
        const query = getByValues('users','userName',['email','password']);
        const result = await executeQuery(query, Object.values(data));
        const token = jwt.sign({ id: data.email }, "privateKey", { expiresIn: '20m' });
        return {userName:result[0].userName,token:token};
        //return result;
        //return {token ,refreshtoken};
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