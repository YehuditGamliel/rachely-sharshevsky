
import express from "express";
import { LoginController } from '../controllers/loginController.js'

//import { UserController } from '../controllers/userController.js'
const loginRouter = express.Router();
const loginController = new LoginController()
//const userController =new UserController();

loginRouter.post('/', loginController.AuthenticationForSignUpOrLogin);
loginRouter.post('/verify', loginController.verifyUserName);
loginRouter.put("/",loginController.updatePassword)
// loginRouter.post("/login", loginController.Authentication)
// loginRouter.post("/loginManager", loginController.AuthenticationManager)
// loginRouter.get("/signUp",loginController.checkUserName)
// loginRouter.post("/signUp", loginController.addUser)

// loginRouter.post("/signUp", userController.addUser);



export {
    loginRouter
}