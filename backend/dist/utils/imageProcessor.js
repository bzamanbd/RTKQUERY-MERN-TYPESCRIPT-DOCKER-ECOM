"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.processImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const processImage = async ({ inputPath, outputDir, imgWidth, imgQuality }) => {
    // Create the folder if it doesn't exist
    if (!fs_1.default.existsSync(outputDir)) {
        fs_1.default.mkdirSync(outputDir, { recursive: true });
    }
    const date = new Date();
    const filename = `compressed-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${Math.round(Math.random() * 1E9)}.jpeg`;
    const outputPath = path_1.default.join(outputDir, filename);
    try {
        await (0, sharp_1.default)(inputPath)
            .resize(imgWidth)
            .toFormat('jpeg')
            .jpeg({ quality: imgQuality })
            .toFile(outputPath);
        return filename; // Return the filename to save it to the user model
    }
    catch (err) {
        const error = new Error('Image processing failed');
        throw { Error: error.message, err };
    }
};
exports.processImage = processImage;
// Deletes a file from the filesystem.
const deleteFile = (filePath) => {
    try {
        fs_1.default.unlinkSync(filePath); // Remove the file
    }
    catch (error) {
        console.error('Failed to delete file:', error);
    }
};
exports.deleteFile = deleteFile;
