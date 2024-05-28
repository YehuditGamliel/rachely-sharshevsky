
import { executeQuery } from './db.js';
import {getByValueQuery,checkUserId, sortedQuery, updateQuery, deleteQuery, addQuery, getAllQuery, AuthenticationQuery } from './queries.js'
export class EyeglassesService {

    async getAllEyeglasses() {
       // console.log("service")

        const query = getAllQuery('eyeglasses', 'model,price,photo,title');
        const result = await executeQuery(query);
        console.log(result)
        return result;
    }
    async getEyeglassesByModel( model) {
        const query = getByValueQuery('eyeglasses','model','color,stock,description,BridgeWidth,lensWidth,company,material');
        const result = await executeQuery(query, [model]);
        console.log(result)
        return result;
    }
    async getEyeglassesByCompany( company) {
        const query = getByValueQuery('eyeglasses','company','photo,model,title,price');
        const result = await executeQuery(query, [company]);
        console.log(result)
        return result;
    }
    // async getExtraDetails() {
    //      const query = getAllQuery('optics.eyeglasses','color,stock,company,description,BridgeWidth,lensWidth,company');
    //      const result = await executeQuery(query);
    //      console.log(result)
    //      return result;
    //  }

    //
    async addEyeglasses( itemDetailes) {
        console.log(Object.values(itemDetailes))
        const query = addQuery('eyeglasses','model,price,photo,p');
        const result = await executeQuery(query, Object.values(itemDetailes));
        return result;
    }
    //
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
    //
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
  
    async deleteObject(tableName, id) {
        const query = deleteQuery(tableName);
        const result = await executeQuery(query, [id]);
        return result;

    }
    async updateObject(tableName, valueType,value, itemDetailes) {
        let values = Object.values(itemDetailes).slice(1)
        const query = updateQuery(tableName,valueType, Object.keys(itemDetailes).slice(1)
    );
        const result = await executeQuery(query, [...values, value]);
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