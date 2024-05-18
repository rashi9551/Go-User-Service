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
const userRepo_1 = __importDefault(require("../repositories/userRepo"));
const bcrypt_1 = __importDefault(require("../services/bcrypt"));
const refferalCodeGenerate_1 = require("../utilities/refferalCodeGenerate");
exports.default = {
    user_registration: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, mobile, password, reffered_Code } = userData;
        const refferal_code = (0, refferalCodeGenerate_1.refferalCode)();
        const hashedPassword = yield bcrypt_1.default.securePassword(password);
        const newUserData = {
            name,
            email,
            mobile,
            password: hashedPassword,
            referral_code: "hgdfgfcghcf"
        };
        const response = yield userRepo_1.default.saveUser(newUserData);
        if (typeof response !== "string" && response._id) {
            // const token = await auth.createToken(response._id.toString())
            return ({ message: "Success" });
        }
    }),
    checkUser: (mobile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userRepo_1.default.checkUser(mobile);
            if (user) {
                return { message: "user already have an account !" };
            }
            else {
                return { message: "user not registered" };
            }
        }
        catch (error) {
            return { message: error.message };
        }
    }),
};
