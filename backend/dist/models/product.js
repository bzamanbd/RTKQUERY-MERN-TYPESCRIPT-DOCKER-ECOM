"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    category: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true
    },
    photos: {
        type: [String],
        default: []
    },
    videos: {
        type: [String],
        default: []
    },
    stock: {
        type: Number,
        required: [true, 'Stock QTY is required']
    },
    tags: {
        type: [String],
        default: []
    },
    code: {
        type: String,
        default: ''
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String,
        default: ''
    }
}, { timestamps: true });
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
