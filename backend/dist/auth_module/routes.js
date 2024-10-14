"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const rateLimiter_1 = __importDefault(require("../utils/rateLimiter"));
const imageUploader_1 = __importDefault(require("../middlewares/imageUploader"));
const routes = (0, express_1.Router)();
const avatarUploader = (0, imageUploader_1.default)('avatar');
routes.post("/register", rateLimiter_1.default, avatarUploader, controllers_1.register);
routes.post("/login", controllers_1.login);
exports.default = routes;
