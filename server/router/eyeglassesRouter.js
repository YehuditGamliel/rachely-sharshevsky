
import express from "express";
import { EyeglassesController } from '../controllers/eyeglassesController.js'
const eyeglassesRouter = express.Router();
const eyeglassesController = new EyeglassesController();
console.log("RouterE");
eyeglassesRouter.get("/:model", eyeglassesController.getEyeglassesByModel)
eyeglassesRouter.put("/:model", eyeglassesController.updateEyeGlasses)
eyeglassesRouter.post("/", eyeglassesController.addEyeglasses)
// eyeglassesRouter.get("/", eyeglassesController.getAllEyeglasses)
eyeglassesRouter.delete("/:model", eyeglassesController.deleteEyeglasses)
eyeglassesRouter.get("/kind/:kind", eyeglassesController.getEyeglassesByKind)
//eyeglassesRouter.get("/typeOfGlasses", eyeglassesController.getTypeOfGlasses)

export {
    eyeglassesRouter
}