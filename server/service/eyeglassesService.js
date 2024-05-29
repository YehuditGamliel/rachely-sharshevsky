
import { executeQuery } from './db.js';
import {getByValueQuery, addQuery, getAllQuery } from './queries.js'
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
}