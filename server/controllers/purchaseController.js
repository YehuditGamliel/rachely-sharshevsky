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

    async getPurchaseByStatus(req, res, next) {
        try {
            const purchaseService = new PurchaseService();
            const resultItems = await purchaseService.getPurchaseByStatus(req.params.status)
          
            console.log("by", resultItems)
            if(resultItems.length!=0){
                return res.status(200).json({ status: 200, data: resultItems });
            }
            else {
                const err = {}
                err.statusCode = 400;
                err.message = "Incorrect data";
                next(err)
            }
            
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async updatePurchase(req, res, next) {
        console.log("❤️", req.params.id, req.body)
        try {
            //let limit = Object.values(req.query).slice(1)
            const purchaseService = new PurchaseService();
            const result = await purchaseService.updatePurchase(req.params.id, req.body)
              
            if (result[0] == true) {
                res.status(200).json({ status: 200, data: "" });                //return res.status(200).json({ status: 200, data: resultItems });
            }
            else {
                const err = {}
                err.statusCode = 400;
                err.message = "Incorrect data";
                next(err)
            }
                // console.log("hiiiiiiiii", result)
                
           

        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async getPurchaseByDate(req, res, next) {
        try {
            const purchaseService = new PurchaseService();
            const resultItems = await purchaseService.getPurchaseByDate(req.params.date)
          
            console.log("by", resultItems)
            console.log("by", resultItems)
            if(resultItems.length!=0){
                return res.status(200).json({ status: 200, data: resultItems });
            }
            else {
                const err = {}
                err.statusCode = 400;
                err.message = "Incorrect data";
                next(err)
            }        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    


}