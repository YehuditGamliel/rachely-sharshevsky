
import express from "express";
import { LoginController } from '../controllers/loginController.js'

const loginRouter = express.Router();
const loginController = new LoginController()

loginRouter.post("/login", loginController.Authentication)
loginRouter.post("/signUp", loginController.addUser)
loginRouter.post('/verify', loginController.verifyUserName);
loginRouter.put("/",loginController.updatePassword)

export {
    loginRouter
}