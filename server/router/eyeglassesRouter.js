
import express from "express";
import { EyeglassesController } from '../controllers/eyeglassesController.js'
const eyeglassesRouter = express.Router();
const eyeglassesController = new EyeglassesController();
console.log("RouterE");
eyeglassesRouter.get("/:model", eyeglassesController.getEyeglassesByModel)

eyeglassesRouter.post("/", eyeglassesController.addEyeglasses)
eyeglassesRouter.get("/", eyeglassesController.getAllEyeglasses)


export {
    eyeglassesRouter
}