
import express from "express";
import { LoginController } from '../controllers/loginController.js'
import {UserController } from '../controllers/userController.js'
const loginRouter = express.Router();
console.log("loginRouter");
const loginController = new LoginController()
const userController=new UserController();
loginRouter.post("/login", loginController.Authentication)
loginRouter.post("/signUp", userController.addUser);
loginRouter.put("/login",loginController.updatePassword)

loginRouter.get("/signUp",loginController.checkUserName)
export {
    loginRouter
}