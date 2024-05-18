import { Router, Request, Response } from "express";
import registrationController from "../controllers/registrationController";
import loginController from '../controllers/loginController'

const userRoute = Router();

userRoute.post('/register',registrationController.sigunp);
userRoute.post('/checkUser',registrationController.checkUser);


userRoute.post('/checkLoginUser',loginController.checkLoginUser);

export default userRoute;
