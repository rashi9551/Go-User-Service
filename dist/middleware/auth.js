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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    createToken: (clientId) => __awaiter(void 0, void 0, void 0, function* () {
        const jwtSeceretKey = process.env.USER_SECRET_KEY || "Rashid";
        const token = yield jsonwebtoken_1.default.sign({ clientId }, jwtSeceretKey);
        return token;
    }),
    verifyOtpToken: (token) => {
        const secretKey = process.env.USER_SECRET_KEY || "Rashid";
        console.log(token);
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
            console.log(decodedToken, "decode");
            return decodedToken;
        }
        catch (error) {
            console.error('Token verification failed:', error.message);
            return ({ message: "inavlid otp" });
        }
    },
    verifyToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.trim().split(" ")[1];
            if (!token) {
                res.status(401).json({ message: "Unauthorized" });
            }
            else {
                try {
                    const jwtSecretKey = process.env.USER_SECRET_KEY || "Rashid";
                    const decodedToken = jsonwebtoken_1.default.verify(token, jwtSecretKey);
                    // req.clientId = decodedToken.clientId;
                    next();
                }
                catch (error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    })
};
