
import express from "express";
import { RoleController } from '../controllers/roleController.js';

const roleRouter = express.Router();    
const roleController = new RoleController()

roleRouter.get("/", roleController.getAllRoles)


export {
    roleRouter
}

