
import express from "express";
import { EyeglassesController } from '../controllers/eyeglassesController.js'
import { verifyToken } from "../middleware/verifyToken.js";

const eyeglassesRouter = express.Router();
const eyeglassesController = new EyeglassesController();

eyeglassesRouter.get("/kind/:kind/:model", eyeglassesController.getEyeglassesByModel)
eyeglassesRouter.put("/:model", eyeglassesController.updateEyeGlasses)
eyeglassesRouter.post("/", eyeglassesController.addEyeglasses)
eyeglassesRouter.delete("/:model", eyeglassesController.deleteEyeglasses)
eyeglassesRouter.get("/kind/:kind",verifyToken ,eyeglassesController.getEyeglassesByKind)
eyeglassesRouter.get("/:model" ,eyeglassesController.getEyeglassesByModel)
//eyeglassesRouter.get("/typeOfGlasses", eyeglassesController.getTypeOfGlasses)
// eyeglassesRouter.get("/", eyeglassesController.getAllEyeglasses)

export {
    eyeglassesRouter
}