
import { executeQuery } from './db.js';
import { getFromTwoTablesByTwoValues,getByValueQuery, addQuery, getAllQuery,updateQuery,getAllSortedQuery ,deleteQuery,getFromTwoTables,getSortFromTwoTablesByTwoValues } from '../queries.js/queries.js'
export class EyeglassesService {

    async  getAllEyeglasses(filter) {
        let query = null;
        if (Object.keys(filter)[1] !== 'sort') {
            query = getAllQuery('eyeglasses', 'model,price,title,imgDisplay,imgCamara', filter);
        } else {
            query = getAllSortedQuery('eyeglasses', 'model,price,title,imgDisplay,imgCamara', filter, filter.sort); 
        }
        const result = await executeQuery(query);
        return result;
    }
    
    async getEyeglassesByModel(model) {
        const query = getByValueQuery('eyeglasses','model','color,stock,description,BridgeWidth,lensWidth,company,material,imgDisplay,imgCamara');
        const result = await executeQuery(query, [model]);
        return result;
    }

    async getEyeglassesByCompany(company) {
        const query = getByValueQuery('eyeglasses','company','model,title,price');
        const result = await executeQuery(query, [company]);
        return result;
    }
    
    async deleteEyeglasses(model){
        const query = deleteQuery('eyeglasses','model');
        const result = await executeQuery(query,[model]);
        return result;
    }

    async addEyeglasses(itemDetailes) {
        const query = addQuery('eyeglasses','model,price,p');
        const result = await executeQuery(query, [...Object.values(itemDetailes)]);
        return result;
    }

    async getEyeglassesByKind(kind,filter) {
        let query;
        if (Object.keys(filter)[1] != 'sort') {
            query = getFromTwoTablesByTwoValues('eyeglasses','glassestype',"idGlassesType","id",'color,price,model,stock,description,BridgeWidth,lensWidth,company,material,imgDisplay,imgCamara',"glassesType",filter);
        } else {
            query = getSortFromTwoTablesByTwoValues('eyeglasses','glassestype',"idGlassesType","id",'color,price,model,stock,description,BridgeWidth,lensWidth,company,material,imgDisplay,imgCamara',"glassesType",filter); 
        }
        const result = await executeQuery(query, [kind]);
        return result;
    }
 
    async updateEyeGlasses(value, itemDetailsArray) {
        const itemDetails = itemDetailsArray; // Access the object inside the array
        const values = Object.values(itemDetails);
        const keys = Object.keys(itemDetails);
        const query = updateQuery('eyeglasses', 'model', keys);
        const result = await executeQuery(query, [...values, value]);
        return result;
    }
}



