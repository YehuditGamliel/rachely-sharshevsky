

import { EyesDataService } from '../service/eyesDataService.js'
export class EyesDataController {

    ///נראה לי לא בשימוש
    async addEyesData(req, res, next) {
        try {
            const eyesDateService = new EyesDataService();
            const resultItem = await eyesDateService.addEyesData(req.body);
            if (resultItem.insertId) {
                res.json(resultItem.insertId);
            }
        }
        catch (ex) {
            next({statusCode: ex.errno || 400, message:ex.message || ex})
        }
    }

    async getEyeDataByUsername(req, res, next) {
        try {
            const purchaseService = new EyesDataService();
            const resultItems = await purchaseService.getEyeDataByUsername(req.params.userName)
            if (resultItems.length) {
                  res.json({ status: 200, data: resultItems });
            }
        }
        catch (ex) { 
            next({statusCode: ex.errno || 500, message:ex.message || ex})
        }
    }
}