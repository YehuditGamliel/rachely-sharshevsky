
import express from "express";
import { UserController } from '../controllers/userController.js'

const userRouter = express.Router();
const usersController = new UserController()

userRouter.post("/login", usersController.getUserByEmail)
userRouter.post("/register", usersController.addUser)
//userRouter.delete("/:id", usersController.deleteUser)
// userRouter.put("/:id", usersController.updateUser)

export {
    userRouter
}