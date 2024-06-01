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
const login_1 = __importDefault(require("../../useCases/login"));
const user_1 = __importDefault(require("../../entities/user"));
const moment_1 = __importDefault(require("moment"));
exports.default = {
    checkLoginUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { mobile } = req.body;
        try {
            const response = yield login_1.default.checkLoginUser(mobile);
            res.json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    checkGoogleLoginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            console.log(email);
            const response = yield login_1.default.checkGoogleUser(email);
            res.json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            console.log(id);
            const response = yield user_1.default.findById(id);
            if (response) {
                const formattedDate = (0, moment_1.default)(response.joiningDate).format("dddd, DD-MM-YYYY");
                const formattedUserData = Object.assign(Object.assign({}, response.toObject()), { formattedDate });
                const formattedTransactions = formattedUserData.wallet.transactions.map((transactions) => (Object.assign(Object.assign({}, transactions), { formattedDate: (0, moment_1.default)(transactions.date).format("dddd, DD-MM-YYYY") })));
                const newData = Object.assign(Object.assign({}, formattedUserData), { formattedTransactions });
                res.json(newData);
            }
            else {
                res.status(500).json({ message: "Soemthing Internal Error" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    profileUpdate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.query;
        const { name, email, mobile } = req.body;
        try {
            const updateFields = {};
            if (name) {
                updateFields.name = name;
            }
            if (email) {
                updateFields.email = email;
            }
            if (mobile) {
                updateFields.mobile = mobile;
            }
            const userData = yield user_1.default.findOneAndUpdate({ _id: user_id }, { $set: updateFields }, { new: true }).exec();
            res.json({ message: "Success", userData });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
};
