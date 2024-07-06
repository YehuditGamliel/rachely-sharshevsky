
import { executeQuery } from './db.js';
import {getAllElementsQuery } from '../queries.js/queries.js'
export class RoleService {


    async  getAllRoles(q) {
        let query = getAllElementsQuery('roles','roleDescription,id')
        const result = await executeQuery(query);
        return result;
    }



    // // async  getAllEyeglasses(q) {
    // //     console.log("Controller ddE")
    // //     let query = null;
    
    // //     if (Object.keys(q)[0] === '_page') {
    // //         query = getAllQuery('eyeglasses', 'model,price,photo,title', q);
    // //     } else {
    // //         query = getAllSortedQuery('eyeglasses', 'model,price,photo,title', q, q.sort); 
    // //     }
    // //     const result = await executeQuery(query);
    // //     console.log("😒",q  ,result)

    // //     return result;
    // // }
    // // async getAllEyeglasses  (req) {
    // //     const q = req.query; // Get query parameters
    // //     const sortedBy = q.sortedBy; // Extract 'sortedBy' from the query parameters
    // //      if(sortedBy=''){
    // //         const query = getAllQuery('eyeglasses', 'model,price,photo,title',q);
    // //      }
    // //     // Use the 'sortedBy' parameter in your query logic
    // //     // Example: Sort the data based on the 'sortedBy' parameter
    // //    else{
    // //     const query = getAllSOrtedQuery('eyeglasses', 'model,price,photo,title', q, sortedBy);
        
    // //    } 
    // //    const result = await executeQuery(query);

    // //     console.log(result);
    // //     return res.json(result);
    // // };

    // async getEyeglassesByModel( model) {
    //     const query = getByValueQuery('eyeglasses','model','color,stock,description,BridgeWidth,lensWidth,company,material,imgDisplay,imgCamara');
    //     const result = await executeQuery(query, [model]);
    //     console.log(result)
    //     return result;
    // }

    // // async getEyeglassesByUrl(url) {
    // //     const query = getByValueQuery('url');
    // //     const result = await executeQuery(query, [url]);
    // //     console.log(result)
    // //     return result;
    // // }
    
    // async getEyeglassesByCompany(company) {
    //     const query = getByValueQuery('eyeglasses','company','model,title,price');
    //     const result = await executeQuery(query, [company]);
    //     console.log(result)
    //     return result;
    // }
    // // async getExtraDetails() {
    // //      const query = getAllQuery('optics.eyeglasses','color,stock,company,description,BridgeWidth,lensWidth,company');
    // //      const result = await executeQuery(query);
    // //      console.log(result)
    // //      return result;
    // //  }

    // //
    // async deleteEyeglasses (model){
    //     console.log(model)
    //     const query = deleteQuery('eyeglasses','model');
    //     const result = await executeQuery(query,[model]);
    //     return result;
    // }
    // async addEyeglasses( itemDetailes) {
    //     console.log(Object.values(itemDetailes))
    //     const query = addQuery('eyeglasses','model,price,p');
    //     const result = await executeQuery(query, [...Object.values(itemDetailes)]);
    //     return result;
    // }
 
    // async updateEyeGlasses(value, itemDetailsArray) {
    //     const itemDetails = itemDetailsArray[0]; // Access the object inside the array
    //     const values = Object.values(itemDetails);
    //     const keys = Object.keys(itemDetails);
    //     console.log("Keys:",keys);

    //     // console.log("Keys:", keys, "Values:", values);
    //     const query = updateQuery('eyeglasses', 'model', keys);
    //     const result = await executeQuery(query, [...values, value]);
    //     return result;
    // }
    
}