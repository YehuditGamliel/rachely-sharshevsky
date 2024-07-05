

import { BranchService } from '../service/branchService.js'

export class BranchController {

    async getAllBranches(req, res, next) {
        try {
            const branchServiceService = new BranchService();
            const resultItems = await branchServiceService.getAllBranches()
            if (resultItems != 0)
                res.json({ data: resultItems });
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message: ex.message || ex})
        }
    }
}