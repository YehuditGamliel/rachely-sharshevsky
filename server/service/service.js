
import { executeQuery } from './db.js';
import {checkUserId, sortedQuery,  getByTitleQuery, updateQuery, deleteQuery, addQuery,  getByValueQuery, AuthenticationQuery } from './queries.js'

export class TableService {
    // async getAll(tableName, id, limit,entity, columns) {
    //     const query = getQuery(tableName, limit,entity, columns);
    //     const result = await executeQuery(query, [id]);
    //     return result;
    // }
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
        const query = getByValueQuery(tableName,'model');
        const result = await executeQuery(query,[model]);
        return result;
    }
    async getByAlphabet(tableName, userId, limit, value, columns) {
        const query = getByTitleQuery(tableName, limit, value, columns);
        const result = await executeQuery(query, [userId]);
        return result;
    }
    async addObject(tableName, itemDetailes) {
        const query = addQuery(tableName, Object.keys(itemDetailes));
        const result = await executeQuery(query, Object.values(itemDetailes));
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