

import { EyesDataService } from '../service/eyesDataService.js'
export class EyesDataController {

    async addEyesData(req, res, next) {
        try {
            const eyesDateService = new EyesDataService();
            const resultItem = await eyesDateService.addEyesData(req.body);
            if (resultItem.insertId) {
                res.status(200).json({ status: 200, data: resultItem.insertId });
            }
            else {
                const err = {}
                err.statusCode = 404;
                err.message = ex;
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

    async getEyeDataByUsername(req, res, next) {
        try {
            const purchaseService = new EyesDataService();
            const resultItems = await purchaseService.getEyeDataByUsername(req.params.userName)
            if (resultItems.length) {
                return res.status(200).json({ status: 200, data: resultItems });
            }
            else {
                const err = {}
                err.statusCode = 404;
                err.message = ex;
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
}