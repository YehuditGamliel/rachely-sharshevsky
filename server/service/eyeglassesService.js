
import { executeQuery } from './db.js';
import {checkUserId, sortedQuery, getByIdQuery, getByTitleQuery, updateQuery, deleteQuery, addQuery, getAllQuery, getByValueQuery, AuthenticationQuery } from './queries.js'

export class EyeglassesService {

    async getAllEyeglasses() {
       // console.log("service")
        const query = getAllQuery('eyeglasses', 'model,price,photo,p');
        const result = await executeQuery(query);
         console.log(result)
        return result;
    }
    async updateEyeglasses( valueType,value, itemDetailes) {
 
        const query = updateQuery('eyeglasses',valueType, itemDetailes);
        const result = await executeQuery(query, [value]);
        console.log(result)
        return result;
    }
    async deleteEyeglasses(tableName, id) {
        const query = deleteQuery('eyeglasses');
        const result = await executeQuery(query, [id]);
        return result;

    }
    async addEyeglasses( itemDetailes) {
        console.log(itemDetailes)
        const query = addQuery('eyeglasses','model,price,photo,p');
        const result = await executeQuery(query, [itemDetailes]);
        //console.log(result)
        return result;
    }
    // async getById(tableName, columns, id) {
    //     const query = getByIdQuery(tableName, columns);
    //     const result = await executeQuery(query, [id]);
    //     return result;
    // }
    // async getByValue(tableName, userId, limit, valueType, value, columns) {
    //     console.log(value)
    //     const query = getByValueQuery(tableName, limit, valueType, columns);
    //     const result = await executeQuery(query, [userId, value]);
    //     return result;
    // }
    async getByValue(tableName) {
        console.log(tableName)
        const query = getByValueQuery(tableName);
        const result = await executeQuery(query);
        return result;
    }
    async getByAlphabet(tableName, userId, limit, value, columns) {
        const query = getByTitleQuery(tableName, limit, value, columns);
        const result = await executeQuery(query, [userId]);
        return result;
    }
  
   
   
    async sort(tableName, userId, limit, sortedKey, columns) {
        const query = sortedQuery(tableName, limit, sortedKey, columns);
        const result = await executeQuery(query, [userId]);
        return result;
    }
    async Authentication(data) {
        const query = AuthenticationQuery();
        const result = await executeQuery(query, Object.values(data));
        return result;
    }
    async checkUserName(userName){ 
         console.log(userName)
        const query = checkUserId();
        const result = await executeQuery(query, [userName]);
        return result;

       
    }
}