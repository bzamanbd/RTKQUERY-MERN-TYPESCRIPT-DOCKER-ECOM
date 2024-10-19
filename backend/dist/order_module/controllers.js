"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markOrderAsViewed = exports.updateOrderStatus = exports.deleteOwnOrder = exports.deleteOrder = exports.myOrderById = exports.myOrders = exports.fetchOrderQRCode = exports.fetchOrder = exports.fetchOrders = exports.createOrder = void 0;
const product_1 = require("./../models/product");
const tryCatch_1 = __importDefault(require("../middlewares/tryCatch"));
const appErr_1 = __importDefault(require("../utils/appErr"));
const order_1 = require("../models/order");
const reduceStock_1 = require("../utils/reduceStock");
const appRes_1 = __importDefault(require("../utils/appRes"));
const mongoose_1 = __importDefault(require("mongoose"));
const qrcode_1 = __importDefault(require("qrcode"));
const path_1 = __importDefault(require("path"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
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
    // Define the public directory
    const INV_DIR = './public/orderInvoice';
    // Ensure the public directory exists
    if (!fs_1.default.existsSync(INV_DIR)) {
        fs_1.default.mkdirSync(INV_DIR, { recursive: true });
    }
    // Generate PDF Invoice
    const pdfPath = path_1.default.join(INV_DIR, `invoice_${order._id}.pdf`);
    const doc = new pdfkit_1.default();
    doc.pipe(fs_1.default.createWriteStream(pdfPath));
    doc.text(`Invoice for Order ID: ${order._id}`);
    // Add more order details here (e.g., item list, total price)
    doc.end();
    // Generate QR Code pointing to the PDF
    const pdfUrl = `http://127.0.0.1:8000/public/orderInvoice/invoice_${order._id}.pdf`;
    const qrCodePath = path_1.default.join(INV_DIR, `qrcode_${order._id}.png`);
    await qrcode_1.default.toFile(qrCodePath, pdfUrl);
    // Update the order with the paths to the PDF and QR code
    order.invoicePath = pdfPath;
    order.qrCode = qrCodePath;
    await order.save();
    // Emit the newOrder event if io is defined
    if (req.io) {
        req.io.emit('newOrder', order);
    }
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
    const order = await order_1.Order.findById({ _id: orderId }).populate("customer", "name email phone address avatar");
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
    const updatedStatus = await order_1.Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedStatus)
        return next((0, appErr_1.default)('No order found!', 404));
    (0, appRes_1.default)(res, 200, '', 'Order-status updated successfully', { updatedStatus: status });
});
exports.markOrderAsViewed = (0, tryCatch_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const { viewed } = req.body;
    const viewedOrder = await order_1.Order.findByIdAndUpdate(id, { viewed }, { new: true });
    if (!viewedOrder)
        return next((0, appErr_1.default)('No order found!', 404));
    (0, appRes_1.default)(res, 200, '', 'Order-viewed updated successfully', { viewedOrder: viewed });
});
