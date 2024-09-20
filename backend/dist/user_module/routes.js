"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const imageUploader_1 = __importDefault(require("../middlewares/imageUploader"));
const routes = (0, express_1.Router)();
const avatarUploader = (0, imageUploader_1.default)('avatar');
routes.get("/", authMiddlewares_1.isLoggedIn, controllers_1.fetchUsers);
routes.get("/user/profile", authMiddlewares_1.isLoggedIn, controllers_1.fetchProfile);
routes.put("/user/update", authMiddlewares_1.isLoggedIn, avatarUploader, controllers_1.updateProfile);
routes.get("/user/question", controllers_1.fetchQuestion);
routes.post("/user/reset-password", controllers_1.resetPassword);
routes.post("/user/update-password", authMiddlewares_1.isLoggedIn, controllers_1.updatePassword);
routes.delete("/user/delete-account", authMiddlewares_1.isLoggedIn, controllers_1.deleteOwnAccount);
exports.default = routes;
