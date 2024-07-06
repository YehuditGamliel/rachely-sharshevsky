

import { EyesDataService } from '../service/eyesDataService.js'
export class EyesDataController {

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