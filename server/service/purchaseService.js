
import { executeQuery } from './db.js';
import { executeTransactionQuery } from './transactionQueries.js';
import { updateOneFieldQuery, getAllElementsQuery, getByValueQuery } from '../queries.js/queries.js'
import { getAllortedFromdPuechesByStatus,getAllFromStatusAndPueches,getStatusFromStatusSchema ,getFromPurchaseAndEyeData,getFromPurchaseAndUsersAndRole,getFromPurchaseAndUsers}from '../queries.js/purchaceQueries.js'
import { sendStyledEmail } from '../emailSender.js';

export class PurchaseService {

    async updatePurchase(value, itemDetails) {
        const query = updateOneFieldQuery('purchase', 'idEyeData', 'status');
        const result = await executeQuery(query, [itemDetails.status, value]);

        if (itemDetails.status == 3) {
            const query2 = getFromPurchaseAndUsers('email', 'idEyeData')
            const result2 = await executeQuery(query2, [value]);
            console.log(result2)
            if (!result2)
                return [false, "IncorretData"]
            sendStyledEmail(result2[0].email, "המשקפים שלך מוכנות מספר הזמנתך הוא:", value)
        }
        return [true, "statusUpdate"];
    }

    async addPurchase(itemDetailes) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let currentDate = (year + "-" + month + "-" + date);
        let dateToString = `"${currentDate}"`;
        const result = await executeTransactionQuery(dateToString, Object.values(itemDetailes));
        sendStyledEmail(itemDetailes[3].email,"הזמנת הושלממ בהצלחנ מספר ההזמנה",result.insertId)
        return result;
    }

    async getStatus(itemDetailes) {
        const query = getStatusFromStatusSchema();
        const result = await executeQuery(query, Object.values(itemDetailes));
        return result;
    }

    async getAllPurchaseStatus() {
        const query = getAllElementsQuery('status', 'id,title');
        const result = await executeQuery(query);
        return result;
    }
    
    async  getuserData(userName) {
        const query = getFromPurchaseAndUsersAndRole('r.roleDescription,email', 'userName');
        const result = await executeQuery(query,[userName]);
        return result;
    }

    async  getEyeDataId(id) {
        const query = getFromPurchaseAndEyeData('e.SPHRight,e.SPHLeft,e.CYLRight,e.CYLLeft,e.PDFAR,e.PDNEAR ', 'idEyeData');
        const result = await executeQuery(query,[id]);
        return result;
    }

    async getAllPurchase() {
        let  query = getAllFromStatusAndPueches( '*');
        const result = await executeQuery(query);
        return result;
    }
    
    async getPurchaseByStatus(status) {
        const query = getAllortedFromdPuechesByStatus( '*',  'status');
        const result = await executeQuery(query,[status]);
        return result;
    }

    async getPurchaseByDate(date) {
        const query = getByValueQuery('purchase', 'date', '*');
        const result = await executeQuery(query, [date.toISOString()]);
        return result;
    }
}
