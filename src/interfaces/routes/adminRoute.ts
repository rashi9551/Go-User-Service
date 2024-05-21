import { Router } from "express";
import adminController from "../controllers/adminController";
const adminRote=Router()

adminRote.post('/login',adminController.login)

export default adminRote