

import { verifyToken } from '../middleware/verifyToken.js';
import { EyeglassesService } from '../service/eyeglassesService.js'

export class EyeglassesController {

    
    async getEyeglassesByModel(req, res, next) {
        try {
            console.log("dssd")
            const eyeglassesService = new EyeglassesService();
            const result = await eyeglassesService.getEyeglassesByModel(req.params.model)
            console.log("result",result)
            // const resultItems = await eyeglassesService.getEyeglassesByCompany(result[0].company)
            // console.log("result",result,"resultItems",resultItems)
            if( result.length){
                res.json({ status: 200, data: result})
            }
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message:ex.message || ex})
        }
    }

    async updateEyeGlasses(req, res, next) {
        try {
            console.log("be",req.params.model, req.body)
            //let limit = Object.values(req.query).slice(1)
            const eyeglassesService = new EyeglassesService();
            const result = await eyeglassesService.updateEyeGlasses(req.params.model, req.body)
            res.status(200).json({ status: 200, data: "" });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
   
    async addEyeglasses(req, res, next) {
        try {
            const eyeglassesService = new EyeglassesService();
            const result = await eyeglassesService.addEyeglasses(req.body);
            if(result.insertId){
                res.status(200).json({ status: 200, data: result.insertId });
            }
            else{
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

    async deleteEyeglasses(req, res, next) {
        try {
            const eyeglassesService = new EyeglassesService();
            await eyeglassesService.deleteEyeglasses(req.params.model);
            res.status(200).json({ status: 200, data: req.params.model });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getEyeglassesByKind(req, res, next) {
        try {
            console.log("😁",req.params.kind,req.query)
            const eyeglassesService = new EyeglassesService();
            const resultItems = await eyeglassesService.getEyeglassesByKind(req.params.kind,req.query)
            if(resultItems.length){
                res.json(resultItems)
            }
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message:ex.message || ex})
        }
    }

}



    // async getAllEyeglasses(req, res, next) {
        //     try {
        //         const eyeglassesService = new EyeglassesService();
        //         const resultItems = await eyeglassesService.getAllEyeglasses(req.query)
        //         if(resultItems.length){
        //             return res.status(200).json({ status: 200, data: resultItems });
        //         }
        //         else{
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