"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async () => {
    const url = process.env.MONGO_URL || 'default_value';
    try {
        await mongoose_1.default.connect(url);
        console.log(`Connected To Database ${mongoose_1.default.connection.host}`);
    }
    catch (e) {
        console.log(`DB-Error: ${e}`);
    }
};
exports.default = connectDb;
