
import express from "express";
import { EnterController } from '../controllers/enterController.js'

const enterRouter = express.Router();
const enterController = new EnterController()

enterRouter.post("/login", enterController.Authentication)
enterRouter.post("/signUp", enterController.addUser)
enterRouter.post('/verify', enterController.verifyUserName);
enterRouter.put("/",enterController.updatePassword)

export {
    enterRouter
}