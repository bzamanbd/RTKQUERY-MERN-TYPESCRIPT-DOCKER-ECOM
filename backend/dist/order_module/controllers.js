"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOrder = exports.deleteOrder = exports.fetchOrder = exports.createOrder = exports.fetchOrders = void 0;
const product_1 = require("./../models/product");
const tryCatch_1 = __importDefault(require("../middlewares/tryCatch"));
const appErr_1 = __importDefault(require("../utils/appErr"));
const order_1 = require("../models/order");
const reduceStock_1 = require("../utils/reduceStock");
const appRes_1 = __importDefault(require("../utils/appRes"));
exports.fetchOrders = (0, tryCatch_1.default)(async (req, res, next) => {
    const orders = await order_1.Order.find({});
    if (orders.length < 1) {
        (0, appRes_1.default)(res, 200, '', 'Order not found', { orders });
        return;
    }
    (0, appRes_1.default)(res, 200, '', `${orders.length} Orders found!`, { orders });
});
exports.createOrder = (0, tryCatch_1.default)(async (req, res, next) => {
    const { orderedItems, shippingAddress, discountCode } = req.body;
    if (!orderedItems || !shippingAddress)
        return next((0, appErr_1.default)('Please Enter all Fields', 400));
    const processedItems = await Promise.all(orderedItems.map(async (orderedItem) => {
        const product = await product_1.Product.findById(orderedItem.productId);
        if (!product)
            throw new Error(`Product with id ${orderedItem.productId} not found`);
        return {
            name: product.name,
            photo: product.photos[0],
            price: product.price,
            quantity: orderedItem.quantity,
            productId: product._id
        };
    }));
    // Calculate subtotal, tax, shipping, and total
    const subtotal = processedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax rate
    const shippingCharges = 50; // Flat shipping charge
    let discount = 0; // Discount will be calculated based on discountCode 
    if (discountCode) {
        // Example: apply a 10% discount if the discount code is valid
        discount = subtotal * 0.1; // 10% discount for demonstration
    }
    const total = subtotal + tax + shippingCharges - discount;
    const order = await order_1.Order.create({
        shippingAddress,
        items: processedItems,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
        customer: req.user._id,
        payment: total,
    });
    await (0, reduceStock_1.reduceStock)(processedItems);
    (0, appRes_1.default)(res, 201, '', 'New order created', { order });
});
exports.fetchOrder = (0, tryCatch_1.default)(async (req, res, next) => {
});
exports.deleteOrder = (0, tryCatch_1.default)(async (req, res, next) => {
});
exports.processOrder = (0, tryCatch_1.default)(async (req, res, next) => {
});
