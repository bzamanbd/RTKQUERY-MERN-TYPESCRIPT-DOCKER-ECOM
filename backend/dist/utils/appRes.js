"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appRes = (res, status, success, message, data = null) => {
    res.status(status).json({
        success: success || 'True',
        message: message,
        data: data
    });
};
exports.default = appRes;
