
import express from "express";
import { BranchController } from '../controllers/branchConrtoller.js'

const branchRouter = express.Router();
const branchConrtoller = new BranchController();

branchRouter.get("/", branchConrtoller.getAllBranches)

export {
    branchRouter
}