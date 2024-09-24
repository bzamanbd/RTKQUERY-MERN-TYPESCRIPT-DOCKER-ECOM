"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOrder = exports.deleteOrder = exports.fetchOrder = exports.createOrder = exports.fetchOrders = void 0;
const tryCatch_1 = __importDefault(require("../middlewares/tryCatch"));
const appErr_1 = __importDefault(require("../utils/appErr"));
const order_1 = __importDefault(require("../models/order"));
const reduceStock_1 = require("../utils/reduceStock");
const appRes_1 = __importDefault(require("../utils/appRes"));
exports.fetchOrders = (0, tryCatch_1.default)(async (req, res, next) => {
    const orders = await order_1.default.find({});
    if (orders.length < 1) {
        (0, appRes_1.default)(res, 200, '', 'Order not found', { orders });
        return;
    }
    (0, appRes_1.default)(res, 200, '', `${orders.length} Orders found!`, { orders });
});
exports.createOrder = (0, tryCatch_1.default)(async (req, res, next) => {
    const { shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total } = req.body;
    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !shippingCharges || !discount || !total)
        return next((0, appErr_1.default)('Please Enter all Fields', 400));
    const order = await order_1.default.create({
        shippingInfo,
        orderItems,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total
    });
    await (0, reduceStock_1.reduceStock)(orderItems);
    (0, appRes_1.default)(res, 201, 'True', 'New order created', { order });
});
exports.fetchOrder = (0, tryCatch_1.default)(async (req, res, next) => {
});
exports.deleteOrder = (0, tryCatch_1.default)(async (req, res, next) => {
});
exports.processOrder = (0, tryCatch_1.default)(async (req, res, next) => {
});
