
import express from "express";
import { BranchController } from '../controllers/branchConrtoller.js'



const branchRouter = express.Router();
const branchConrtoller=new BranchController();
// const branchController = new BranchController();
console.log("RouterE");
branchRouter.get("/", branchConrtoller.getAllCitiesBranches)
branchRouter.get("/:city", branchConrtoller.geAllBranchesByCity)
// eyeglassesRouter.put("/:model", branchController.updateEyeGlasses)
// eyeglassesRouter.post("/", branchController.addEyeglasses)
// eyeglassesRouter.get("/", branchController.getAllEyeglasses)
// וגם להוסיף סניפיםהמנהל צריך שיהיה יכול גם למחוק וגם לעדכן
// eyeglassesRouter.delete("/:model", branchController.deleteEyeglasses)

export {
    branchRouter
}