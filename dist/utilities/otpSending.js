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
exports.sendOtp = void 0;
const auth_1 = __importDefault(require("../middleware/auth"));
const generateOtp_1 = __importDefault(require("../services/generateOtp"));
const nodeMailer_1 = require("../services/nodeMailer");
const sendOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otp = (0, generateOtp_1.default)();
        const token = yield auth_1.default.createToken(otp);
        const subject = "Otp Verification";
        const text = `Hello ${name},\n\nThank you for registering with Go!, your OTP is ${otp}\n\nHave a nice day!!!`;
        yield (0, nodeMailer_1.sendMail)(email, subject, text);
        console.log(otp, token, "sfjhagfjhsg");
        console.log(token);
        return token;
    }
    catch (error) {
    }
});
exports.sendOtp = sendOtp;
