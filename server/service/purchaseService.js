
import { executeQuery } from './db.js';
import { executeTransactionQuery } from './transactionQueries.js';
import { updateOneFieldQuery, getFromTwoTables, getAllSortedQuery, getByValues, getAllElementsQuery, getByValueQuery } from './queries.js'
import{getAllFromStatusAndPueches, getAllortedFromdPuechesByStatus,getFromPurchaseAndEyeData,getFromPurchaseAndUsersAndRole,getFromPurchaseAndUsers}from './purchaceQueries.js'
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
            const query2 = getFromPurchaseAndUsers('email', 'id')
            const result2 = await executeQuery(query2, [value]);
            if (!result2)
                return [false, "IncorretData"]
            sendStyledEmail(result2[0].email, "המשקפים שלך מוכנות מספר הזמנתך הוא:", value)
        }
        return [true, "statusUpdate"];
    }

    async addPurchase(itemDetailes) {
        console.log("itemDetailes",itemDetailes)
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let currentDate = (year + "-" + month + "-" + date);
        let dateToString = `"${currentDate}"`;
        const stock = await executeTransactionQuery(dateToString, Object.values(itemDetailes));
        console.log("stock",stock)
        if(stock){
            const query = updateOneFieldQuery('eyeglasses', 'stock', 'isActive');
            console.log(query)
            const result = await executeQuery(query, [0,0]);
            console.log("itemDetailes[1]",itemDetailes[1])
            sendStyledEmail(itemDetailes[2].email,"הזמנת הושלממ בהצלחנ מספר ההזמנה","!")
            return result;
        }
        console.log("itemDetailes[1]",itemDetailes[1])
        sendStyledEmail(itemDetailes[2].email,"הזמנת הושלממ בהצלחנ מספר ההזמנה","!")
        return stock;
    }

    async getStatus(itemDetailes) {
        const query = getByValues('purchase', 'status', Object.keys(itemDetailes));
        const result = await executeQuery(query, Object.values(itemDetailes));
        return result;
    }

    async getAllPurchaseStatus(itemDetailes) {
        const query = getAllElementsQuery('status', 'id,title');
        const result = await executeQuery(query);
        console.log(result)
        return result;
    }
    
    async  getuserData(userName) {
        const query = getFromPurchaseAndUsersAndRole('r.roleDescription,email', 'userName');
        const result = await executeQuery(query,[userName]);
        console.log(userName,"userName")
        return result;
    }

    async  getEyeDataId(id) {
        const query = getFromPurchaseAndEyeData('e.SPHRight,e.SPHLeft,e.CYLRight,e.CYLLeft,e.PDFAR,e.PDNEAR ', 'idEyeData');
        const result = await executeQuery(query,[id]);
        console.log(id,"userName")
        return result;
    }

    async getAllPurchase(q) {
        // let query = null;
        // if (Object.keys(q)[0] !== 'sort') {
           let  query = getAllFromStatusAndPueches( '*');
        // } else {
            //ךסדר
        //     query = getAllortedFromSortedAndPueches( '*',  q.sort);
        // }
        const result = await executeQuery(query);
        return result;
    }
    
    async getPurchaseByStatus(status) {
        console.log(status)
        const query = getAllortedFromdPuechesByStatus( '*',  'status');
        const result = await executeQuery(query,[status]);
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