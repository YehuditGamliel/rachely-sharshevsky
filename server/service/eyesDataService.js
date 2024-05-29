
import { executeQuery } from './db.js';
import { addQuery } from './queries.js'
export class EyesDataService {

           
    async addEyesData( itemDetailes) {
        console.log("service");
        console.log(Object.values(itemDetailes))
        const query = addQuery('eyesdata','SPHRight,SPHLeft,CYLRight,CYLLeft,addLeft,addRight,PDFAR,PDNERAR');
        const result = await executeQuery(query, Object.values(itemDetailes));
        console.log("result",result)
        return result;
    }
 
}