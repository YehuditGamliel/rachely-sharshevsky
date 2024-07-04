
import express from "express";
import { PurchaseController } from '../controllers/purchaseController.js';

const purchaseRouter = express.Router();
const purchaseController = new PurchaseController()

purchaseRouter.post("/", purchaseController.addPurchase)
purchaseRouter.get("/", purchaseController.getAllPurchase)
purchaseRouter.get("/status", purchaseController.getAllPurchaseStatus)
purchaseRouter.post("/getStatut", purchaseController.getStatus)
purchaseRouter.get("/date/:date", purchaseController.getPurchaseByDate)
purchaseRouter.put("/:id", purchaseController.updatePurchase)
purchaseRouter.get("/status/:status", purchaseController.getPurchaseByStatus)
purchaseRouter.get("/userName/:userName", purchaseController.getuserData)


export {
  purchaseRouter
}