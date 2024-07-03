
import { executeQuery } from './db.js';
import { executeTransactionQuery } from './transactionQueries.js';
import { updateOneFieldQuery, getFromTwoTables, getAllSortedQuery, getByValues, getAllElementsQuery, getByValueQuery } from './queries.js'
import { sendStyledEmail } from '../emailSender.js';
export class PurchaseService {

    async updatePurchase(value, itemDetails) {
        // const itemDetails = itemDetailsArray; // Access the object inside the array
        // const values = Object.values(itemDetails);
        // const keys = Object.keys(itemDetails);
        // console.log("Keys:", keys, "Values:", values);
        const query = updateOneFieldQuery('purchase', 'id', 'status');
        const result = await executeQuery(query, [itemDetails.status, value]);
        // (tableName1,tableName2, value, columns) {
        if (itemDetails.status == 3) {
            const query2 = getFromTwoTables('users', 'purchase', 'userName', 'email', 'id')
            const result2 = await executeQuery(query2, [value]);
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
        return result;
    }

    async getStatus(itemDetailes) {
        const query = getByValues('purchase', 'status', Object.keys(itemDetailes));
        const result = await executeQuery(query, Object.values(itemDetailes));
        return result;
    }

    async getAllPurchase(q) {
        let query = null;
        if (Object.keys(q)[0] !== 'sort') {
            query = getAllElementsQuery('purchase', '*');
        } else {
            query = getAllSortedQuery('eyeglasses', '*', q, q.sort);
        }
        const result = await executeQuery(query);
        return result;
    }
    
    async getPurchaseByStatus(status) {
        const query = getByValueQuery('purchase', 'status', '*');
        const result = await executeQuery(query, [status]);
        console.log(result)
        return result;
    }
    async getPurchaseByDate(date) {
        const query = getByValueQuery('purchase', 'date', '*');
        const result = await executeQuery(query, [date.toISOString()]);
        console.log(result)
        return result;
    }
}


// async  getAllEyeglasses(q) {
    //     let query = null;

    //     if (Object.keys(q)[0] === '_page') {
    //         query = getAllQuery('eyeglasses', 'model,price,title,imgDisplay,imgCamara', q);
    //     } else {
    //         query = getAllSortedQuery('eyeglasses', 'model,price,title,imgDisplay,imgCamara', q, q.sort); 
    //     }
    //     const result = await executeQuery(query);
    //     return result;
    // }