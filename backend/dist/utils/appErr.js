"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appErr = (message, statusCode) => {
    let error = new Error(message);
    error.statusCode = statusCode || 500;
    error.stack = error.stack;
    return error;
};
exports.default = appErr;
