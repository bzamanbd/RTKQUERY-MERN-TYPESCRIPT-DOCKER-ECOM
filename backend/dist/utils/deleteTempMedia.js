"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// Utility function to delete multiple files (images and videos)
const deleteTempFiles = (files) => {
    files.forEach((file) => {
        if (!file || typeof file.path !== 'string') {
            console.error(`Error: Invalid file object or path for ${file}`);
            return;
        }
        fs_1.default.unlink(file.path, (err) => {
            if (err) {
                console.error(`Error deleting file ${file.path}:`, err);
            }
            else {
                console.log(`File deleted successfully: ${file.path}`);
            }
        });
    });
};
exports.default = deleteTempFiles;
