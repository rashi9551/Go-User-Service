import { Router } from "express";
import adminController from "../controllers/adminController";
import auth from '../../middleware/auth'
const adminRote=Router()

adminRote.post('/login',adminController.login)
adminRote.get('/getUserData',auth.verifyToken,adminController.getData)
adminRote.post('/blockUser',auth.verifyToken,adminController.blockUser)

adminRote.get('/blockedUserData',auth.verifyToken,adminController.getBlockedData)
adminRote.post('/unblockUser',auth.verifyToken,adminController.unblockUser)
export default adminRote