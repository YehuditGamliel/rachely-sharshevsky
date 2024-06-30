
import { executeQuery } from './db.js';
import { addPurchaseQuery ,getByValues} from './queries.js'

export class PurchaseService {

    async addPurchase(itemDetailes) {
        console.log("itemDetailes",itemDetailes)
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let currentDate = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
        let dateToString = `"${currentDate}"`;
        let statusToString = `"${"Invitation"}"`;
        //Kסדר שיהיה גנרי
        const query = addPurchaseQuery(`userName, date, price, status, model, idEyeData`,`SPHRight, SPHLeft, CYLRight, CYLLeft, PDFAR, PDNEAR,idKindOfGlasses, idCU6, idKindOfPrescription`,dateToString,statusToString);
        const result = await executeQuery(query, Object.values(itemDetailes));
        console.log("service")
        return result;

    }
    async getStatus(itemDetailes) {
       
            const query =  getByValues('purchase', 'status',Object.keys(itemDetailes)) ;
            const result = await executeQuery(query, Object.values(itemDetailes));
      
        return result;
    }
}