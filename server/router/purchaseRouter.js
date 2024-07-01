
import express from "express";
import { PurchaseController } from '../controllers/purchaseController.js';

const purchaseRouter = express.Router();
const purchaseController = new PurchaseController()

purchaseRouter.post("/", purchaseController.addPurchase)
purchaseRouter.get("/", purchaseController.getAllPurchase)
purchaseRouter.post("/getStatut", purchaseController.getStatus)
  purchaseRouter.get("/date/:date", purchaseController.getPurchaseByDate)
purchaseRouter.get("/status/:status", purchaseController.getPurchaseByStatus)


export {
    purchaseRouter
}