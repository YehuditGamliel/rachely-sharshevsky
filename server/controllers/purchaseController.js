import { PurchaseService } from '../service/purchaseService.js';

export class PurchaseController {

    
    async addPurchase(req, res, next) {
        try {
            const purchaseService = new PurchaseService()
            const resultItem = await purchaseService.addPurchase(req.body);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async getStatus(req, res, next) {
        try {
            const purchaseService = new PurchaseService()
            const resultItem = await purchaseService.getStatus(req.body);
            console.log(resultItem.length)
            if(resultItem.length!=0){
                res.status(200).json({ status: 200, data: resultItem });
            }
            else {
                const err = {}
                err.statusCode = 400;
                err.message = "Incorrect data";
                next(err)
            }
            
           
        }
        catch (ex) {
            console.log("catch")
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }



}