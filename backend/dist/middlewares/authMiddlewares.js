"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isLoggedIn = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appErr_1 = __importDefault(require("../utils/appErr"));
const isLoggedIn = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return next((0, appErr_1.default)('No token provided', 401));
    const token = authHeader.split(' ')[1];
    if (!token)
        return next((0, appErr_1.default)('Unauthorized', 401));
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.default.findById({ _id: payload.id });
        // console.log(user);
        if (!user)
            return next((0, appErr_1.default)('Unauthorized', 401));
        req.user = user;
        next();
    }
    catch (e) {
        return next((0, appErr_1.default)('Tocken is expired or incorrect', 498));
    }
};
exports.isLoggedIn = isLoggedIn;
const isAdmin = async (req, res, next) => {
    try {
        const role = req.user?.role;
        if (role !== 'admin')
            return next((0, appErr_1.default)('Unauthorized access', 401));
        next();
    }
    catch (e) {
        return next((0, appErr_1.default)(e.message, 500));
    }
};
exports.isAdmin = isAdmin;
