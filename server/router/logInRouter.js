
import express from "express";
import { LoginController } from '../controllers/loginController.js'

//import { UserController } from '../controllers/userController.js'
const loginRouter = express.Router();
console.log("🤷‍♀️")
const loginController = new LoginController()
//const userController =new UserController();

loginRouter.post('/', loginController.signUpUser);
loginRouter.post('/verify', loginController.verifyUserName);
// loginRouter.post("/login", loginController.Authentication)
// loginRouter.post("/loginManager", loginController.AuthenticationManager)
// loginRouter.get("/signUp",loginController.checkUserName)
// loginRouter.post("/signUp", loginController.addUser)

// loginRouter.post("/signUp", userController.addUser);
// loginRouter.put("/login",loginController.updatePassword)


export {
    loginRouter
}