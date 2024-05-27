
import express from "express";
import {EyesDataController } from '../controllers/eyesDataController.js'
const eyesDataRouter = express.Router();
const eyesDataController = new EyesDataController();
console.log("RouterE");
// eyesDataRouter.get("/:model", eyeglassesController.getEyeglassesByModel)

eyesDataRouter.post("/", eyesDataController.addEyesData)
// eyesDataRouter.get("/", eyeglassesController.getAllEyeglasses)


export {
    eyesDataRouter
}