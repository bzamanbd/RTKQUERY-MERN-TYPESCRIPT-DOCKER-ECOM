"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const orderSchema = new Schema({
    shippingAddress: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    items: [
        {
            name: String,
            photo: String,
            price: Number,
            quantity: Number,
            productId: { type: Schema.Types.ObjectId, ref: "Product" }
        }
    ],
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    shippingCharges: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    payment: {},
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing"
    },
    qrCode: {
        type: String, // Store the QR code as a data URL or a URL to the image
        default: "",
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
    updatedAt: {
        type: Date,
        default: () => new Date(),
    },
});
// Automatically update the `updatedAt` field before saving
orderSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
exports.Order = mongoose_1.default.model('Order', orderSchema);
