"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const deleteMedia_1 = __importDefault(require("../utils/deleteMedia"));
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
        type: String,
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
        type: String,
        required: [true, "Answer to reset password is required"],
    },
    role: {
        type: String,
        default: "client",
        enum: ["client", "admin", "vendor", "driver"],
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    orders: [{
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }],
}, { timestamps: true });
userSchema.post('findOneAndDelete', function (doc) {
    if (doc && doc.avatar) {
        (0, deleteMedia_1.default)(doc.avatar);
    }
});
exports.User = mongoose_1.default.model('User', userSchema);
