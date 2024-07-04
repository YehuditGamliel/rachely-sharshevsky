
import { executeQuery } from './db.js';

import {getByValueQuery,getAllElementsQuery, addQuery, getAllQuery,updateQuery,getAllSortedQuery ,deleteQuery} from './queries.js'

export class InvitationService {
   

    async getAll(nameOtTable) {
        const query = getAllElementsQuery(nameOtTable,'*');
        const result = await executeQuery(query);
        return result;
    }
    
    //   async getEyeglassesByCity( city) {
    //     const query = getByValueQuery('branches','city','street,number,lng,lat,phone,hours,days,id');
    //     const result = await executeQuery(query, [city]);
    //     console.log(result)
    //     return result;
    // }
}
