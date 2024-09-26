"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_js_1 = require("./controllers.js");
const auth_js_1 = require("../middlewares/auth.js");
const routes = (0, express_1.Router)();
routes.post("/payment", auth_js_1.isLoggedIn, controllers_js_1.createPaymentIntent);
routes.post("/new", auth_js_1.isLoggedIn, auth_js_1.isAdmin, controllers_js_1.newCoupon);
routes.get("/discount", auth_js_1.isLoggedIn, controllers_js_1.applyDiscount);
routes.get("/all", auth_js_1.isLoggedIn, auth_js_1.isAdmin, controllers_js_1.allCoupons);
routes.delete("/:id", auth_js_1.isLoggedIn, auth_js_1.isAdmin, controllers_js_1.deleteCoupon);
exports.default = routes;
