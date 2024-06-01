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
const registartion_1 = __importDefault(require("../../useCases/registartion"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const otpSending_1 = require("../../utilities/otpSending");
exports.default = {
    signup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, mobile, password, reffered_Code, otp } = req.body;
        const userData = {
            name,
            email,
            mobile,
            password,
            reffered_Code,
            userImage: req.file
        };
        try {
            const token = req.cookies.otp;
            const secretKey = process.env.USER_SECRET_KEY || "Rashid";
            const jwtOtp = auth_1.default.verifyOtpToken(token);
            console.log(jwtOtp, "ithu coookkie token");
            if (otp === (jwtOtp === null || jwtOtp === void 0 ? void 0 : jwtOtp.clientId)) {
                const response = yield registartion_1.default.user_registration(userData);
                console.log(response);
                res.json(response);
            }
            else {
                res.json({ message: "Invalid OTP" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }),
    checkUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { mobile, email, name } = req.body;
        try {
            const response = yield registartion_1.default.checkUser(mobile, email);
            console.log(response);
            if (response.message === "user not registered") {
                console.log("nokkindu");
                const token = yield (0, otpSending_1.sendOtp)(email);
                res.cookie("otp", token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 180000),
                    sameSite: "none",
                    secure: true,
                });
            }
            res.json(response);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    resendOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, name } = req.body;
            console.log("email", email);
            const token = yield (0, otpSending_1.sendOtp)(email);
            res.cookie("otp", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 180000),
                sameSite: "none",
                secure: true,
            });
            res.status(200).json({ message: "OTP resent successfully" });
        }
        catch (error) {
            console.log(error);
        }
    })
};
