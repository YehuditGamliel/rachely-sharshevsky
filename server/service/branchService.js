
import { executeQuery } from './db.js';

import {getByValueQuery,getAllElementsQuery, addQuery, getAllQuery,updateQuery,getAllSortedQuery ,deleteQuery} from './queries.js'

export class BranchService {
   

    async  getAllCitiesBranches(q) {
        let query = null;
    console.log("🙌",q)
        // if (Object.keys(q)[0] !== 'sorted') {
            query = getAllElementsQuery('branches','city');
        // } else {
        //     query = getAllSortedQuery('eyeglasses', 'model,price,photo,title', q, q.sort); 
        // }
        const result = await executeQuery(query);
        console.log("😒",q  ,result)

        return result;
    }
      async getEyeglassesByCity( city) {
        const query = getByValueQuery('branches','city','street,number,lng,lat,phone,hours,days,id');
        const result = await executeQuery(query, [city]);
        console.log(result)
        return result;
    }
}
    // async getAllEyeglasses  (req) {
    //     const q = req.query; // Get query parameters
    //     const sortedBy = q.sortedBy; // Extract 'sortedBy' from the query parameters
    //      if(sortedBy=''){
    //         const query = getAllQuery('eyeglasses', 'model,price,photo,title',q);
    //      }
    //     // Use the 'sortedBy' parameter in your query logic
    //     // Example: Sort the data based on the 'sortedBy' parameter
    //    else{
    //     const query = getAllSOrtedQuery('eyeglasses', 'model,price,photo,title', q, sortedBy);
        
    //    } 
    //    const result = await executeQuery(query);

    //     console.log(result);
    //     return res.json(result);
    // };

    // async getEyeglassesByCity( model) {
    //     const query = getByValueQuery('eyeglasses','model','color,stock,description,BridgeWidth,lensWidth,company,material');
    //     const result = await executeQuery(query, [model]);
    //     console.log(result)
    //     return result;
    // }
    
    // async getEyeglassesByCompany( company) {
    //     const query = getByValueQuery('eyeglasses','company','photo,model,title,price');
    //     const result = await executeQuery(query, [company]);
    //     console.log(result)
    //     return result;
    // }
    // async getExtraDetails() {
    //      const query = getAllQuery('optics.eyeglasses','color,stock,company,description,BridgeWidth,lensWidth,company');
    //      const result = await executeQuery(query);
    //      console.log(result)
    //      return result;
    //  }

    //
//     async deleteEyeglasses (model){
//         console.log(model)
//         const query = deleteQuery('eyeglasses');
//         const result = await executeQuery(query,model);
//         return result;
//     }
//     async addEyeglasses( itemDetailes) {
//         console.log(Object.values(itemDetailes))
//         const query = addQuery('eyeglasses','model,price,photo,p');
//         const result = await executeQuery(query, Object.values(itemDetailes));
//         return result;
//     }
 
//     async updateEyeGlasses(value, itemDetailsArray) {
//         const itemDetails = itemDetailsArray[0]; // Access the object inside the array
//         const values = Object.values(itemDetails);
//         const keys = Object.keys(itemDetails);
//         console.log("Keys:", keys, "Values:", values);
//         const query = updateQuery('eyeglasses', 'model', keys);
//         const result = await executeQuery(query, [...values, value]);
//         return result;
//     }
    
// }