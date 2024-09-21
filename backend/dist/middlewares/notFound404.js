"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound404 = (req, res, next) => {
    res.status(404).json({
        status: 'False',
        message: `Route Not Found 404`
    });
};
exports.default = notFound404;
