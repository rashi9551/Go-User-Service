"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrationController_1 = __importDefault(require("../controllers/registrationController"));
const userRoute = (0, express_1.Router)();
userRoute.post('/register', registrationController_1.default.sigunp);
userRoute.post('/checkUser', registrationController_1.default.checkUser);
exports.default = userRoute;
