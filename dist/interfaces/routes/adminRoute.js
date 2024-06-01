"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const adminRote = (0, express_1.Router)();
adminRote.post('/login', adminController_1.default.login);
adminRote.get('/getUserData', auth_1.default.verifyToken, adminController_1.default.getData);
adminRote.post('/blockUser', auth_1.default.verifyToken, adminController_1.default.blockUser);
adminRote.get('/blockedUserData', auth_1.default.verifyToken, adminController_1.default.getBlockedData);
adminRote.post('/unblockUser', auth_1.default.verifyToken, adminController_1.default.unblockUser);
exports.default = adminRote;
