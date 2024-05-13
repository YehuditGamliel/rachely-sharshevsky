
import express from "express";

import { UserController } from '../controllers/userController.js'
const userRouter = express.Router();

const usersController = new UserController()

console.log("pppppppppppewewe")
userRouter.get("/", usersController.getUserById)
// userRouter.post("/", usersController.addUser)
userRouter.delete("/:id", usersController.deleteUser)
// userRouter.put("/:id", usersController.updateUser)

export {
    userRouter
}