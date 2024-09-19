"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.default = isValidEmail;
