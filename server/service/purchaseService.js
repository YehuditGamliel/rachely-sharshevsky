
import { executeQuery } from './db.js';
import { addPurchaseQuery } from './queries.js'

export class PurchaseService {

    async addPurchase(itemDetailes) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let currentDate = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
        const query = addPurchaseQuery(`userEmail, date, price, status, model, idEyeData`,`SPHRight, SPHLeft, CYLRight, CYLLeft, addLeft, addRight, PDFAR, PDNERAR,idKindOfGlasses, idCU6, idKindOfPrescription`,currentDate,"Invitation");
        const result = await executeQuery(query, Object.values(itemDetailes));
        return result;
    }
}