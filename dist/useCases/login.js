"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../middleware/auth"));
const userRepo_1 = __importDefault(require("../repositories/userRepo"));
exports.default = {
    checkLoginUser: (mobile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userRepo_1.default.findUser(mobile);
            if (user) {
                if (user.account_status != "Blocked") {
                    const token = yield auth_1.default.createToken(user._id.toString());
                    return { message: "Success", name: user.name, token, _id: user._id };
                }
                else {
                    return { message: "Blocked" };
                }
            }
            else {
                return { message: "No user found" };
            }
        }
        catch (error) {
            return error.message;
        }
    }),
    checkGoogleUser: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userRepo_1.default.findEmail(email);
            if (user) {
                if (user.account_status != "Blocked") {
                    const token = yield auth_1.default.createToken(user._id.toString());
                    return { message: "Success", name: user.name, token, _id: user._id };
                }
                else {
                    return { message: "Blocked" };
                }
            }
            else {
                return { message: "No user found" };
            }
        }
        catch (error) {
            return error.message;
        }
    })
};
