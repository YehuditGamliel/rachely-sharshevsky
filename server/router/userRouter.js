
import express from "express";
import { UserController } from '../controllers/userController.js'

const userRouter = express.Router();
const usersController = new UserController()

//userRouter.get("/", usersController.getUserById)
// userRouter.post("/", usersController.addUser)
userRouter.post("/", usersController.getUserByEmail)
//userRouter.delete("/:id", usersController.deleteUser)
// userRouter.put("/:id", usersController.updateUser)

export {
    userRouter
}