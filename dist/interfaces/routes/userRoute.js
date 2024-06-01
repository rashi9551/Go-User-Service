"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrationController_1 = __importDefault(require("../controllers/registrationController"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const multer_1 = __importDefault(require("../../middleware/multer"));
const userRoute = (0, express_1.Router)();
userRoute.post('/register', multer_1.default.single("userImage"), registrationController_1.default.signup);
userRoute.post('/checkUser', registrationController_1.default.checkUser);
userRoute.post('/resendOtp', registrationController_1.default.resendOtp);
userRoute.post('/checkGoogleLoginUser', loginController_1.default.checkGoogleLoginUser);
userRoute.post('/checkLoginUser', loginController_1.default.checkLoginUser);
userRoute.get('/userData', auth_1.default.verifyToken, loginController_1.default.getUser);
userRoute.post('/profileUpdate', auth_1.default.verifyToken, loginController_1.default.profileUpdate);
exports.default = userRoute;
