"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_js_1 = require("./controllers.js");
const auth_1 = require("../middlewares/auth");
const mediaUploader_1 = __importDefault(require("../middlewares/mediaUploader"));
const routes = (0, express_1.Router)();
const productMediaUploader = mediaUploader_1.default.fields([{ name: 'photos', maxCount: 3 }, { name: 'videos', maxCount: 1 }]);
routes.post("/new", auth_1.isLoggedIn, auth_1.isAdmin, productMediaUploader, controllers_js_1.createProduct);
routes.get("/", controllers_js_1.fetchProducts);
routes.get("/:id", controllers_js_1.fetchProductById);
routes.put("/:id", auth_1.isLoggedIn, auth_1.isAdmin, productMediaUploader, controllers_js_1.editProduct);
routes.delete("/:id", auth_1.isLoggedIn, controllers_js_1.deleteProduct);
exports.default = routes;
