"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.deleteOwnOrder = exports.deleteOrder = exports.myOrderById = exports.myOrders = exports.fetchOrderQRCode = exports.fetchOrder = exports.fetchOrders = exports.createOrder = void 0;
const product_1 = require("./../models/product");
const tryCatch_1 = __importDefault(require("../middlewares/tryCatch"));
const appErr_1 = __importDefault(require("../utils/appErr"));
const order_1 = require("../models/order");
const reduceStock_1 = require("../utils/reduceStock");
const appRes_1 = __importDefault(require("../utils/appRes"));
const mongoose_1 = __importDefault(require("mongoose"));
const qrcode_1 = __importDefault(require("qrcode"));
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
            stock: product.stock,
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
    // Generate a unique string for the QR code (e.g., using the order ID)
    const qrData = `order:${order._id}`;
    // Generate the QR code as a data URL
    const qrCode = await qrcode_1.default.toDataURL(qrData);
    // Optionally, store the QR code in the order object
    order.qrCode = qrCode;
    await order.save();
    (0, appRes_1.default)(res, 201, '', 'New order created', { order });
});
exports.fetchOrders = (0, tryCatch_1.default)(async (req, res, next) => {
    const orders = await order_1.Order.find({}).populate("customer", "name");
    if (orders.length < 1)
        return (0, appRes_1.default)(res, 200, '', `Orders not found!`, { orders });
    (0, appRes_1.default)(res, 200, '', `${orders.length} Orders found!`, { orders });
});
exports.fetchOrder = (0, tryCatch_1.default)(async (req, res, next) => {
    const orderId = req.params.id;
    if (!orderId)
        return next((0, appErr_1.default)('id is required', 400));
    if (!mongoose_1.default.Types.ObjectId.isValid(orderId))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    const order = await order_1.Order.findById({ _id: orderId }).populate("customer", "name");
    if (!order)
        return (0, appRes_1.default)(res, 200, '', `Order not found!`, { order });
    (0, appRes_1.default)(res, 200, '', `Order found!`, { order });
});
// Get the QR code for an order by ID
exports.fetchOrderQRCode = (0, tryCatch_1.default)(async (req, res, next) => {
    const orderId = req.params.id;
    if (!orderId)
        return next((0, appErr_1.default)('id is required', 400));
    if (!mongoose_1.default.Types.ObjectId.isValid(orderId))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    const order = await order_1.Order.findById({ _id: orderId });
    if (!order)
        return (0, appRes_1.default)(res, 200, '', `Order not found!`, { order });
    (0, appRes_1.default)(res, 200, '', `Order found!`, { QRCode: order.qrCode });
});
exports.myOrders = (0, tryCatch_1.default)(async (req, res, next) => {
    const userId = req.user?._id;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    const orders = await order_1.Order.find({ customer: userId });
    if (!orders)
        return (0, appRes_1.default)(res, 200, '', `Orders not found!`, { orders });
    (0, appRes_1.default)(res, 200, '', `Orders found!`, { orders });
});
exports.myOrderById = (0, tryCatch_1.default)(async (req, res, next) => {
    const userId = req.user?._id;
    const orderId = req.params.id;
    if (!orderId)
        return next((0, appErr_1.default)('id is required', 400));
    if (!mongoose_1.default.Types.ObjectId.isValid(orderId))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    if (!mongoose_1.default.Types.ObjectId.isValid(userId))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    const order = await order_1.Order.findOne({ customer: userId, _id: orderId });
    if (!order)
        return (0, appRes_1.default)(res, 200, '', `Order not found!`, { order });
    (0, appRes_1.default)(res, 200, '', `Order found!`, { order });
});
exports.deleteOrder = (0, tryCatch_1.default)(async (req, res, next) => {
    const orderId = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(orderId))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    await order_1.Order.findByIdAndDelete(orderId);
    (0, appRes_1.default)(res, 200, '', 'Order is deleted successfully', {});
});
exports.deleteOwnOrder = (0, tryCatch_1.default)(async (req, res, next) => {
    const userId = req.user._id;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    await order_1.Order.findOneAndDelete({ customer: userId });
    (0, appRes_1.default)(res, 200, '', 'Order is deleted successfully', {});
});
exports.updateOrderStatus = (0, tryCatch_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["Processing", "Shipped", "Delivered"];
    if (!validStatuses.includes(status))
        return (0, appRes_1.default)(res, 200, '', 'Invalid status', {});
    const updatedOrder = await order_1.Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder)
        return next((0, appErr_1.default)('No order found!', 404));
    (0, appRes_1.default)(res, 200, '', 'Order updated successfully', { updatedOrder });
});
