import { PurchaseService } from '../service/purchaseService.js';
import { purchaseSchema } from '../validateData/validatePurchase.js';
import { sendStyledEmail } from '../emailSender.js';

export class PurchaseController {

    async getAllPurchase(req, res, next) {
        try {
            const purchaseService = new PurchaseService()
            const resultItem = await purchaseService.getAllPurchase();
            res.json({ data: resultItem });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message: ex.message || ex})
        }
    }

    async getAllPurchaseStatus(req, res, next) {
        try {
            const purchaseService = new PurchaseService()
            const resultItem = await purchaseService.getAllPurchaseStatus();
            res.json({ data: resultItem });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message: ex.message || ex})
        }
    }

    async addPurchase(req, res, next) {
        try {
            const purchaseService = new PurchaseService()
            const resultItem = await purchaseService.addPurchase(req.body);
            sendStyledEmail(resultItem[0],"הזמנת הושלמה בהצלחה מספר ההזמנה",resultItem[1])
            res.json({ data: resultItem });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500 , message: ex.message || ex})
        }
    }

    async getStatus(req, res, next) {
        try {
            const purchaseService = new PurchaseService()
            const resultItem = await purchaseService.getStatus(req.body);
            res.json({ data: resultItem });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message: ex.message || ex})
        }
    }

    async getuserData(req, res, next) {
        try {
            const purchaseService = new PurchaseService()
            const resultItem = await purchaseService.getuserData(req.params.userName);
            res.json({ data: resultItem });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message: ex.message || ex})
        }
    }

    async getEyeDataId(req, res, next) {
        try {
            const purchaseService = new PurchaseService()
            const resultItem = await purchaseService.getEyeDataId(req.params.eyeDataId);
            res.json({  data: resultItem });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message: ex.message || ex})
        }
    }

    async getPurchaseByStatus(req, res, next) {
        try {
            const purchaseService = new PurchaseService();
            const resultItems = await purchaseService.getPurchaseByStatus(req.params.status)
            res.json({ data: resultItems });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message: ex.message || ex})
        }
    }
    
    async updatePurchase(req, res, next) {
        try {
            const purchaseService = new PurchaseService();
            const result = await purchaseService.updatePurchase(req.params.id, req.body)
            if(result[1]== "sendEmail")
            {
                sendStyledEmail(result[2], "המשקפים שלך מוכנות מספר הזמנתך הוא:", result[3])
            }
            res.json({ data: result });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message: ex.message || ex})
        }
    }

    async getPurchaseByDate(req, res, next) {
        try {
            const purchaseService = new PurchaseService();
            const resultItems = await purchaseService.getPurchaseByDate(req.params.date)
            res.json({ data: resultItems });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message: ex.message || ex})
        }
    }
}