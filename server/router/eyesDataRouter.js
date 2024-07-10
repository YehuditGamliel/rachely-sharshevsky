
import express from "express";
import {EyesDataController } from '../controllers/eyesDataController.js'

const eyesDataRouter = express.Router();
const eyesDataController = new EyesDataController();

eyesDataRouter.get("/:userName", eyesDataController.getEyeDataByUsername)

export {
    eyesDataRouter
}