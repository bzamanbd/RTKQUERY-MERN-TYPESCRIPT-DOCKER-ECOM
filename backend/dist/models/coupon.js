"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const couponSchema = new Schema({
    code: {
        type: String,
        required: [true, "Please enter the coupon code"],
        unique: true
    },
    amount: {
        type: Number,
        required: [true, "Please enter the discount amount"]
    }
}, { timestamps: true });
exports.Coupon = mongoose_1.default.model('Coupon', couponSchema);
