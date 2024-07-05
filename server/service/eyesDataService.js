
import { executeQuery } from './db.js';
import { addQuery,getByValueQuery } from './queries.js'

export class EyesDataService {

    // async addEyesData(itemDetailes) {
    //     const query = addQuery('eyesdata','SPHRight,SPHLeft,CYLRight,CYLLeft,addLeft,addRight,PDFAR,PDNERAR');
    //     const result = await executeQuery(query, Object.values(itemDetailes));
    //     return result;
    // }

    async getEyeDataByUsername(username) {
        const queryPurchase = getByValueQuery('purchase', 'userName', 'date,idEyeData');
        const purchaseOfUser = await executeQuery(queryPurchase, [username]);
        let sortedPurchase = [];
        if (purchaseOfUser && purchaseOfUser.length > 0) {
            sortedPurchase = purchaseOfUser.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        const queryEyesData = getByValueQuery(
            'eyesdata', 'id', 'SPHRight,SPHLeft,CYLRight,CYLLeft,PDFAR,PDFAR');
        const eyesdata = await executeQuery(queryEyesData, [sortedPurchase[0].idEyeData]);
        return eyesdata;
    }
 
 
}