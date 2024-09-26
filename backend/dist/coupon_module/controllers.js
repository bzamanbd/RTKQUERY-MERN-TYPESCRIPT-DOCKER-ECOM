"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.allCoupons = exports.applyDiscount = exports.newCoupon = exports.createPaymentIntent = void 0;
const appErr_1 = __importDefault(require("../utils/appErr"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const appRes_1 = __importDefault(require("../utils/appRes"));
const tryCatch_1 = __importDefault(require("../middlewares/tryCatch"));
const coupon_1 = require("../models/coupon");
const server_1 = require("../server");
exports.createPaymentIntent = (0, tryCatch_1.default)(async (req, res, next) => {
    const { amount } = req.body;
    if (!amount)
        return next((0, appErr_1.default)('Please enter an amount', 400));
    const paymentIntent = await server_1.stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: "usd",
    });
    (0, appRes_1.default)(res, 200, '', 'Payment is done successfully', {
        clientSecret: paymentIntent.client_secret
    });
});
exports.newCoupon = (0, tryCatch_1.default)(async (req, res, next) => {
    const { coupon, amount } = req.body;
    if (!coupon || !amount)
        return next((0, appErr_1.default)('coupon and amount are required', 400));
    const newCoupon = await coupon_1.Coupon.create({ code: coupon, amount });
    (0, appRes_1.default)(res, 201, '', `Coupon is created successfully`, { newCoupon });
});
exports.applyDiscount = (0, tryCatch_1.default)(async (req, res, next) => {
    const { coupon } = req.query;
    const discount = await coupon_1.Coupon.findOne({ code: coupon });
    if (!discount)
        return next((0, appErr_1.default)('Invalid coupon code', 400));
    (0, appRes_1.default)(res, 200, '', `Coupon is found!`, { discount });
});
exports.allCoupons = (0, tryCatch_1.default)(async (req, res, next) => {
    const coupons = await coupon_1.Coupon.find({});
    if (coupons.length < 1)
        return (0, appRes_1.default)(res, 200, '', 'No coupon found!', { coupons });
    (0, appRes_1.default)(res, 200, '', `${coupons.length} coupons found`, { coupons });
});
exports.deleteCoupon = (0, tryCatch_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next((0, appErr_1.default)('id is required', 400));
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    const coupon = await coupon_1.Coupon.findByIdAndDelete(id);
    if (!coupon)
        return next((0, appErr_1.default)('Coupon not found!', 404));
    (0, appRes_1.default)(res, 200, '', 'Coupon is deleted successfully', {});
});
