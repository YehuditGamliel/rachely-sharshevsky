

import { EyeglassesService } from '../service/eyeglassesService.js'

export class EyeglassesController {
   async getAllEyeglasses(req, res, next) {
    //console.log("Controller E")
    try {
        //let limit = Object.values(req.query).slice(1)
        const eyeglassesService = new EyeglassesService();
        const resultItems = await eyeglassesService.getAllEyeglasses()
        return res.status(200).json({ status: 200, data: resultItems });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}

//     async getCommentById(req, res, next) {
//     try {
//         const commentsService = new TableService();
//         const resultItem = await commentsService.getById(CommentController.tableName,CommentController.columns, req.params.id);
//         res.status(200).json({ status: 200, data: resultItem });
//     }
//     catch (ex) {
//         const err = {}
//         err.statusCode = 500;
//         err.message = ex;
//         next(err)
//     }
// }
   async addEyeglasses(req, res, next) {
    try {
        console.log(req.body)
        const eyeglassesService = new EyeglassesService();
        let values = Object.values( req.body)
        const resultItem = await eyeglassesService.addEyeglasses(`"${values[0]}",${values[1]},"${values[2]}",${values[3]}`);
        res.status(200).json({ status: 200, data: resultItem.insertId });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}


    async deleteEyeglasses(req, res, next) {

    try {
        const eyeglassesService = new EyeglassesService();
        await eyeglassesService.deleteEyeglasses( req.params.id);
        res.status(200).json({ status: 200, data: req.params.id });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}

    async updateEyeglasses(req, res, next) {
        try {
            console.log("updatwControler")
            const eyeglassesService = new EyeglassesService();
            let values = Object.values( req.body)
            console.log(Object.values( req.body))
                let data=`id=${values[0]} , model="${values[1]}", price=${values[2]}, photo="${values[3]}" ,p=${values[4]}`
            await eyeglassesService.updateEyeglasses("model",req.params.model,data);
            //console.Consolelog(data)
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
}




}