
import express from "express";
import {  InvitationController } from '../controllers/InvitationController.js'

const invitationRouter = express.Router();
const invitationController = new InvitationController();


invitationRouter.get("/:paper", invitationController.getAll)
// eyeglassesRouter.put("/:model", eyeglassesController.updateEyeGlasses)
// eyeglassesRouter.post("/", eyeglassesController.addEyeglasses)
// // eyeglassesRouter.get("/", eyeglassesController.getAllEyeglasses)
// eyeglassesRouter.delete("/:model", eyeglassesController.deleteEyeglasses)
// eyeglassesRouter.get("/kind/:kind", eyeglassesController.getEyeglassesByKind)
// //eyeglassesRouter.get("/typeOfGlasses", eyeglassesController.getTypeOfGlasses)

export {
    invitationRouter
}