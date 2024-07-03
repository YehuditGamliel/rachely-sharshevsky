
import { executeQuery } from './db.js';

import {getByValueQuery,getAllElementsQuery, addQuery, getAllQuery,updateQuery,getAllSortedQuery ,deleteQuery} from './queries.js'

export class InvitationService {
   

    async  getAll(nameOtTable) {
        console.log(nameOtTable)
        const query = getAllElementsQuery(nameOtTable,'*');
           
        // } else {
        //     query = getAllSortedQuery('eyeglasses', 'model,price,photo,title', q, q.sort); 
        // }
        const result = await executeQuery(query);
        // console.log("😒",q  ,result)

        return result;
    }
    //   async getEyeglassesByCity( city) {
    //     const query = getByValueQuery('branches','city','street,number,lng,lat,phone,hours,days,id');
    //     const result = await executeQuery(query, [city]);
    //     console.log(result)
    //     return result;
    // }
}
