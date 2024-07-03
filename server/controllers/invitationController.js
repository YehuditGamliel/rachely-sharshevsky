import { InvitationService } from '../service/InvitationService.js';

export class InvitationController {

    async getAll(req, res, next) {
        try {

            console.log(req.params.paper,req.query)
            const invitationService = new InvitationService()
            const resultItem = await invitationService.getAll(req.params.paper);
            if (resultItem.length != 0) {
                res.status(200).json({ status: 200, data: resultItem });
            }
            else {
                const err = {}
                err.statusCode = 404;
                err.message = ex;
            }
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    // async addPurchase(req, res, next) {
    //     const mergedObjectsData = (req.body).reduce((acc, obj) => {
    //         return { ...acc, ...obj };
    //     }, {});
    //     let data = mergedObjectsData;
    //     const { error } = purchaseSchema.validate(data)
    //     if (error) {
    //         console.log("error", error)
    //         const err = {}
    //         err.statusCode = 400;
    //         err.message = "Incorrect data";
    //         next(err)
    //     }
    //     try {
    //         const purchaseService = new PurchaseService()
    //         const resultItem = await purchaseService.addPurchase(req.body);
    //         res.status(200).json({ status: 200, data: resultItem });
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }
    // async getStatus(req, res, next) {
    //     try {
    //         const purchaseService = new PurchaseService()
    //         const resultItem = await purchaseService.getStatus(req.body);
    //         if (resultItem.length != 0) {
    //             res.status(200).json({ status: 200, data: resultItem });
    //         }
    //         else {
    //             const err = {}
    //             err.statusCode = 404;
    //             err.message = ex;
    //             next(err)
    //         }
    //     }
    //     catch (ex) {
    //         console.log("catch")
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }

    // async getPurchaseByStatus(req, res, next) {
    //     try {
    //         const purchaseService = new PurchaseService();
    //         const resultItems = await purchaseService.getPurchaseByStatus(req.params.status)
    //         if (resultItems.length != 0) {
    //             return res.status(200).json({ status: 200, data: resultItems });
    //         }
    //         else {
    //             const err = {}
    //             err.statusCode = 404;
    //             err.message = ex;
    //             next(err)
    //         }

    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }


    // async updatePurchase(req, res, next) {
    //     const mergedObjectsData = (req.body).reduce((acc, obj) => {
    //         return { ...acc, ...obj };
    //     }, {});
    //     let data = mergedObjectsData;
    //     const { error } = purchaseSchema.validate(data)
    //     if (error) {
    //         console.log(error)
    //         const err = {}
    //         err.statusCode = 400;
    //         err.message = "Incorrect data";
    //         next(err)
    //     }
    //     try {
    //         const purchaseService = new PurchaseService();
    //         const result = await purchaseService.updatePurchase(req.params.id, req.body)
    //         if (result[0] == true) {
    //             res.status(200).json({ status: 200, data: "" });
    //         }
    //         else {
    //             const err = {}
    //             err.statusCode = 400;
    //             err.message = "Incorrect data";
    //             next(err)
    //         }
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }

    // async getPurchaseByDate(req, res, next) {
    //     try {
    //         const purchaseService = new PurchaseService();
    //         const resultItems = await purchaseService.getPurchaseByDate(req.params.date)
    //         if (resultItems.length != 0) {
    //             return res.status(200).json({ status: 200, data: resultItems });
    //         }
    //         else {
    //             const err = {}
    //             err.statusCode = 400;
    //             err.message = "Incorrect data";
    //             next(err)
    //         }
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }




}