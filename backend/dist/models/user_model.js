"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "user name is required"],
    },
    email: {
        type: String,
        required: [true, "email name is required"],
        unique: true,
    },
    password: {
        type: Schema.Types.Mixed,
        required: [true, "password is required"],
    },
    phone: {
        type: String,
        required: [true, "phone number is require"],
    },
    address: {
        type: String
    },
    avatar: {
        type: String,
        default: "",
    },
    question: {
        type: String,
        required: [true, "Question to reset password is required"],
    },
    answer: {
        type: Schema.Types.Mixed,
        required: [true, "Answer to reset password is required"],
    },
    role: {
        type: String,
        default: "client",
        enum: ["client", "admin", "vendor", "driver"],
    },
    orders: [{
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }],
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
