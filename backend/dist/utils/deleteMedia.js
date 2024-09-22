"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteMedia = (mediaPath) => {
    const fullPath = path_1.default.join(process.cwd(), '.', mediaPath);
    fs_1.default.unlink(fullPath, (err) => {
        if (err) {
            console.error('Error deleting media file:', err);
        }
        else {
            console.log('Product media files deleted successfully');
        }
    });
};
exports.default = deleteMedia;
