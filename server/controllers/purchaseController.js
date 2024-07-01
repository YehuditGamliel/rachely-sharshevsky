import { PurchaseService } from '../service/purchaseService.js';

export class PurchaseController {

    async getAllPurchase(req, res, next) {
        try {
            const purchaseService = new PurchaseService()
            const resultItem = await purchaseService.getAllPurchase(req.query);
            res.status(200).json({ status: 200, data: resultItem });
            
           
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
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

    async getPurchaseByOrder(req, res, next) {
        try {
            const eyeglassesService = new PurchaseService();
            const resultItems = await eyeglassesService.getEyeglassesByModel(req.params.model)
            const result = await eyeglassesService.getEyeglassesByCompany(resultItems[0].company)
            console.log("by", resultItems, result)
            return res.status(200).json({ status: 200, data: [resultItems, result] });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


}