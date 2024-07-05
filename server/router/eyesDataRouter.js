
import express from "express";
import {EyesDataController } from '../controllers/eyesDataController.js'

const eyesDataRouter = express.Router();
const eyesDataController = new EyesDataController();

//eyesDataRouter.post("/", eyesDataController.addEyesData)
eyesDataRouter.get("/:userName", eyesDataController.getEyeDataByUsername)


export {
    eyesDataRouter
}