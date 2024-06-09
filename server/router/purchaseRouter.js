
import express from "express";
import { PurchaseController } from '../controllers/purchaseController.js';

const purchaseRouter = express.Router();
const purchaseController = new PurchaseController()

purchaseRouter.post("/", purchaseController.addPurchase)


export {
    purchaseRouter
}