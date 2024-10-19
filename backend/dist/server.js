"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const express_1 = __importDefault(require("express"));
const appRes_1 = __importDefault(require("./utils/appRes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB_1 = __importDefault(require("./config/connectDB"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const index_1 = __importDefault(require("./routes/index"));
const notFound404_1 = __importDefault(require("./middlewares/notFound404"));
const path_1 = __importDefault(require("path"));
const stripe_1 = __importDefault(require("stripe"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // Your frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // Clean up on disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
// Middleware to attach `io` to the request
app.use((req, res, next) => {
    req.io = io;
    next();
});
const port = process.env.PORT || 9000;
const stripeKey = process.env.STRIPE_KEY || "";
(0, connectDB_1.default)();
exports.stripe = new stripe_1.default(stripeKey);
app.use(express_1.default.json(), index_1.default);
app.use('/public', express_1.default.static(path_1.default.join(process.cwd(), 'public')));
app.get('/', (req, res) => { (0, appRes_1.default)(res, 200, '', 'server health is fine', {}); });
app.use(notFound404_1.default, globalErrorHandler_1.default);
app.listen(port, () => console.log(`server runs on http://localhost:${port}`));
