import { Router, Request, Response } from "express";
import registrationController from "../controllers/registrationController";
import loginController from '../controllers/loginController'
import auth from "../../middleware/auth";
import upload from "../../middleware/multer";

const userRoute = Router();

userRoute.post('/register',upload.single("userImage"),registrationController.signup);
userRoute.post('/checkUser',registrationController.checkUser);
userRoute.post('/resendOtp',registrationController.resendOtp);


userRoute.post('/checkGoogleLoginUser',loginController.checkGoogleLoginUser);
userRoute.post('/checkLoginUser',loginController.checkLoginUser);
userRoute.get('/userData',auth.verifyToken,loginController.getUser);

userRoute.post('/profileUpdate',auth.verifyToken,loginController.profileUpdate);
export default userRoute;
