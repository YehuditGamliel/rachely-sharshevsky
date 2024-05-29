
import express from "express";
import { LoginController } from '../controllers/loginController.js'
//import { UserController } from '../controllers/userController.js'
const loginRouter = express.Router();

const loginController = new LoginController()
//const userController =new UserController();

loginRouter.post("/login", loginController.Authentication)
loginRouter.get("/signUp",loginController.checkEmail)



// loginRouter.post("/register", loginController.addUser)

// loginRouter.post("/signUp", userController.addUser);
// loginRouter.put("/login",loginController.updatePassword)


export {
    loginRouter
}