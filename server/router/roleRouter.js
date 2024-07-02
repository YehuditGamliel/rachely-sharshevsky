
import express from "express";
import { RoleController } from '../controllers/roleController.js';

const roleRouter = express.Router();    
const roleController = new RoleController()


// purchaseRouter.post("/", purchaseController.addPurchase)
// purchaseRouter.get("/", purchaseController.getAllPurchase)
// purchaseRouter.post("/getStatut", purchaseController.getStatus)
//   purchaseRouter.get("/date/:date", purchaseController.getPurchaseByDate)
//   purchaseRouter.put("/:id", purchaseController.updatePurchase)
roleRouter.get("/", roleController.getAllRoles)


export {
    roleRouter
}

