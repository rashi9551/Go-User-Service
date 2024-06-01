"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import session from 'express-session'
const http_1 = __importDefault(require("http"));
const adminRoute_1 = __importDefault(require("./interfaces/routes/adminRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongo_1 = __importDefault(require("./config/mongo"));
const userRoute_1 = __importDefault(require("./interfaces/routes/userRoute"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
//   app.use(
//       session({
//           secret: uuidv4(),
//           resave: false,
//           saveUninitialized: true,
//           cookie: {
//               maxAge: 24 * 60 * 60 * 1000,
//             },
//         })
//     );
app.use((0, cookie_parser_1.default)());
(0, mongo_1.default)();
app.use('/users', userRoute_1.default);
app.use('/admin', adminRoute_1.default);
app.get('/', (req, res) => {
    res.send().status(200);
});
const port = process.env.PORT || 3002;
server.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
