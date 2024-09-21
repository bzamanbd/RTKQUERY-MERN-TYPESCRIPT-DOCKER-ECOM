"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to handle 404 - Not Found
const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Cannot find ${req.originalUrl} on this server!`
    });
};
exports.default = notFoundMiddleware;
