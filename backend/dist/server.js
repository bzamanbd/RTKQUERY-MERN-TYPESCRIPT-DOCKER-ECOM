"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const appRes_1 = __importDefault(require("./utils/appRes"));
dotenv_1.default.config();
const connectDB_1 = __importDefault(require("./config/connectDB"));
(0, connectDB_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 9000;
app.use(express_1.default.json());
app.get('/', (req, res) => { (0, appRes_1.default)(res, 200, '', 'server health is fine', {}); });
app.use('*', (req, res) => { (0, appRes_1.default)(res, 404, 'False', `${req.originalUrl} <== Route not found`, {}); });
app.listen(port, () => console.log(`server runs on http://localhost:${port}`));
