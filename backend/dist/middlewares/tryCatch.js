"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TryCatch = (fn) => {
    return (req, res, next) => {
        // Call the route handler and catch any errors
        fn(req, res, next).catch(next);
    };
};
exports.default = TryCatch;
