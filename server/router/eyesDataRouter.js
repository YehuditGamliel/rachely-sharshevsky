
import express from "express";
import {EyesDataController } from '../controllers/eyesDataController.js'

const eyesDataRouter = express.Router();
const eyesDataController = new EyesDataController();

// eyesDataRouter.get("/:model", eyeglassesController.getEyeglassesByModel)

eyesDataRouter.post("/", eyesDataController.addEyesData)
eyesDataRouter.get("/userName/:userName", eyesDataController.getEyeDataByUsername)

// eyesDataRouter.get("/", eyeglassesController.getAllEyeglasses)


export {
    eyesDataRouter
}