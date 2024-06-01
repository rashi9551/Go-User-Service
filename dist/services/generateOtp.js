"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
};
exports.default = generateOTP;
