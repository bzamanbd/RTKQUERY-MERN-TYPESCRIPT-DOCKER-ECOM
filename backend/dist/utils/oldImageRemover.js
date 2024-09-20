"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.oldImageRemover = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const oldImageRemover = ({ existImage }) => {
    if (fs_1.default.existsSync(existImage)) {
        if (existImage) {
            const oldLogoPath = path_1.default.join(existImage);
            fs_1.default.unlinkSync(oldLogoPath);
        }
    }
};
exports.oldImageRemover = oldImageRemover;
const deleteFile = (filePath) => {
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${filePath}`, err);
        }
    });
};
exports.deleteFile = deleteFile;
