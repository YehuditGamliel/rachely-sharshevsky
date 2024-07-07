

import { verifyToken } from '../middleware/verifyToken.js';
import { EyeglassesService } from '../service/eyeglassesService.js'
import { eyeglassesSchema } from '../validateData/validateEyeglasses.js'; 


export class EyeglassesController {

    async getEyeglassesByModel(req, res, next) {
        try {
            const eyeglassesService = new EyeglassesService();
            const result = await eyeglassesService.getEyeglassesByModel(req.params.model)
            res.json({ data: result })
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message:ex.message || ex})
        }
    }

    async updateEyeGlasses(req, res, next) {
        try {
            const { error } = eyeglassesSchema.validate(req.body)
            if (error) {
                next({statusCode: ex.errno || 400, message: ex.message || ex})
            }
            const eyeglassesService = new EyeglassesService();
            const result = await eyeglassesService.updateEyeGlasses(req.params.model, req.body)
            res.json({ data: result });
        }
        catch (ex) {
            next({statusCode: ex.errno || 404, message:ex.message || ex})
        }
    }
   
    async addEyeglasses(req, res, next) {
        try {
            const { error } = eyeglassesSchema.validate(req.body)
            if (error) {
                next({statusCode: ex.errno || 400, message: ex.message || ex})
            }
            const eyeglassesService = new EyeglassesService();
            const result = await eyeglassesService.addEyeglasses(req.body);
            res.json({ data: result.insertId });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message:ex.message || ex})
        }
    }

    async deleteEyeglasses(req, res, next) {
        try {
            const eyeglassesService = new EyeglassesService();
            await eyeglassesService.deleteEyeglasses(req.params.model);
            res.json({ data: req.params.model });
        }
        catch (ex) {
            next({statusCode: ex.errno || 404, message:ex.message || ex})
        }
    }

    async getEyeglassesByKind(req, res, next) {
        try {
            const eyeglassesService = new EyeglassesService();
            const resultItems = await eyeglassesService.getEyeglassesByKind(req.params.kind,req.query)
            res.json(resultItems)
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message:ex.message || ex})
        }
    }
}

