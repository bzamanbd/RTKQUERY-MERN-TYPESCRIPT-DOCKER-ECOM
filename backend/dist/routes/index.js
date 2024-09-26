"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("../auth_module/routes"));
const routes_2 = __importDefault(require("../user_module/routes"));
const routes_3 = __importDefault(require("../product_module/routes"));
const routes_4 = __importDefault(require("../order_module/routes"));
const routes_5 = __importDefault(require("../coupon_module/routes"));
const router = (0, express_1.Router)();
router.use("/api/v1/auth", routes_1.default);
router.use("/api/v1/users", routes_2.default);
router.use("/api/v1/products", routes_3.default);
router.use("/api/v1/orders", routes_4.default);
router.use("/api/v1/coupons", routes_5.default);
exports.default = router;
