"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importStar(require("express"));
// import basicAuth from 'express-basic-auth';
const dotenv_1 = __importDefault(require("dotenv"));
// import morgan from 'morgan';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
});
require("./src/db/connect");
const bot_1 = __importDefault(require("./src/bot"));
// if (process.env.NODE_ENV === 'production') {
//   bot.sendMessage(process.env.TG_ADMIN_GROUP_ID, `[${process.env.STAGE}] deploy successfully`)
// }
exports.routes = (0, express_1.Router)();
const app = (0, express_1.default)();
const port = process.env.PORT;
// if (process.env.NODE_ENV === 'production') {
//   app.use(morgan('combined'));
// }
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.use('/cert/add/das1fda124da', basicAuth({
//   users: { '2fimasdfqf': '1298dnasd8fnasd' }
// }));
app.get('/', (req, res) => {
    res.send('VPN');
});
exports.routes.use(function (req, res, next) {
    req.bot = bot_1.default;
    next();
});
// routesList(routes)
// app.use('/', routes);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
// cron(bot);
