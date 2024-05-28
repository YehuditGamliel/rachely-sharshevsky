

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
async getEyeglassesByModel(req, res, next) {
    console.log("Controller E")
    try {
        //let limit = Object.values(req.query).slice(1)
        const eyeglassesService = new EyeglassesService();
        const resultItems = await eyeglassesService.getEyeglassesByModel(req.params.model)
        const result = await eyeglassesService.getEyeglassesByCompany(resultItems[0].company)
        console.log(result)
        return res.status(200).json({ status: 200, data: [resultItems,result] });
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
       // console.log("dfs")
        const eyeglassesService = new EyeglassesService();
        const resultItem = await eyeglassesService.addEyeglasses(req.body);
        res.status(200).json({ status: 200, data: resultItem.insertId });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}


    async deletecomment(req, res, next) {
    try {
        const commentsService = new TableService();
        await commentsService.deleteObject(CommentController.tableName, req.params.id);
        res.status(200).json({ status: 200, data: req.params.id });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}

    async updatecomment(req, res, next) {
        try {
            const commentService = new TableService();
            await commentService.updateObject(CommentController.tableName, req.params.id, req.body);
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