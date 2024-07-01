

import { EyesDataService } from '../service/eyesDataService.js'
export class EyesDataController {

   async addEyesData(req, res, next) {
    try {
       console.log("dfs")
        const eyesDateService = new EyesDataService();
        const resultItem = await eyesDateService.addEyesData(req.body);
        console.log(resultItem)
        res.status(200).json({ status: 200, data: resultItem.insertId });
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
        if(resultItems){
            return res.status(200).json({ status: 200, data: resultItems });
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