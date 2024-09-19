"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appRes_1 = __importDefault(require("./utils/appRes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB_1 = __importDefault(require("./config/connectDB"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const index_1 = __importDefault(require("./routes/index"));
(0, connectDB_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 9000;
app.use(express_1.default.json(), index_1.default, globalErrorHandler_1.default);
app.get('/', (req, res) => { (0, appRes_1.default)(res, 200, '', 'server health is fine', {}); });
app.use('*', (req, res) => { (0, appRes_1.default)(res, 404, 'False', `${req.originalUrl} <== Route not found`, {}); });
app.listen(port, () => console.log(`server runs on http://localhost:${port}`));
