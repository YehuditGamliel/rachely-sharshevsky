
import { executeQuery } from './db.js';
import { addQuery,getByValueQuery } from './queries.js'
export class EyesDataService {

           
    async addEyesData( itemDetailes) {
        console.log("service");
        console.log(Object.values(itemDetailes))
        const query = addQuery('eyesdata','SPHRight,SPHLeft,CYLRight,CYLLeft,addLeft,addRight,PDFAR,PDNERAR');
        const result = await executeQuery(query, Object.values(itemDetailes));
        console.log("result",result)
        return result;
    }

    async getEyeDataByUsername(username) {
        console.log("username",username)
        const queryPurchase = getByValueQuery('purchase', 'userName', 'date,idEyeData');
        const purchaseOfUser = await executeQuery(queryPurchase, [username]);
        console.log("purchaseOfUser",purchaseOfUser)
        let sortedPurchase = [];
        if (purchaseOfUser && purchaseOfUser.length > 0) {
            sortedPurchase = purchaseOfUser.sort((a, b) => new Date(b.date) - new Date(a.date));
            console.log("sortedPurchase",sortedPurchase)
        }
        const queryEyesData = getByValueQuery('eyesdata', 'id', '*');
        const eyesdata = await executeQuery(queryEyesData, [sortedPurchase[0].idEyeData]);
        return eyesdata;
    }
 
 
}