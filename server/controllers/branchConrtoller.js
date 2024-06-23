

import { BranchService } from '../service/branchService.js'
//import { sha512, sha384, sha512_256, sha512_224 } from 'js-sha512';
// /import { UserService } from '../service/userService.js';
import { UserService } from '../service/userService.js'

export class BranchController {
    async getAllCitiesBranches(req, res, next) {
        //console.log("Controller E")
        try {
            //let limit = Object.values(req.query).slice(1)
            const branchServiceService = new BranchService();
            const resultItems = await branchServiceService.getAllCitiesBranches(req.query)
           console.log(resultItems)
            return res.status(200).json({ status: 200, data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async geAllBranchesByCity(req, res, next) {
        console.log("Controller E")
        try {
            console.log("hi")
            const branchServiceService = new BranchService();
            const resultItems = await branchServiceService.getEyeglassesByCity(req.params.city)
           console.log(resultItems)
            return res.status(200).json({ status: 200, data: resultItems });
            //let limit = Object.values(req.query).slice(1)
         
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
  

}