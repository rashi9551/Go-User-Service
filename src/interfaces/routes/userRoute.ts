import { Router, Request, Response } from "express";
import registrationController from "../controllers/registrationController";

const userRoute = Router();

userRoute.post('/register',registrationController.sigunp);
userRoute.post('/checkUser',registrationController.checkUser);

export default userRoute;
