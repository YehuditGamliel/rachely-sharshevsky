
import express from "express";
import {  InvitationController } from '../controllers/InvitationController.js'

const invitationRouter = express.Router();
const invitationController = new InvitationController();


invitationRouter.get("/:paper", invitationController.getAll)

export {
    invitationRouter
}