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
const user_1 = __importDefault(require("../entities/user"));
exports.default = {
    saveUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new user_1.default({
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile,
            password: userData.password,
            referral_code: userData.referral_code
        });
        try {
            const saveUser = yield newUser.save();
            console.log("user saved into db");
            return saveUser;
        }
        catch (error) {
            return error.message;
        }
    }),
    checkUser: (mobile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDetail = yield user_1.default.findOne({ mobile });
            return userDetail;
        }
        catch (error) {
        }
    })
};
