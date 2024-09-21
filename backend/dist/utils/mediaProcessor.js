"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_1 = __importDefault(require("fs"));
const mediaProcessor = {
    processAndMoveMedia: async ({ files, destinationDir, imgSize, imgQuality, isImage = true, videoSize } = {}) => {
        const processedFiles = [];
        for (const file of files) {
            const __dirname = path_1.default.dirname(__filename);
            // Adjust '..' based on directory structure
            const projectRoot = path_1.default.resolve(__dirname, '..');
            // Navigate to the public folder
            const outputDir = path_1.default.join(projectRoot, './public/product', destinationDir);
            if (!fs_1.default.existsSync(outputDir)) {
                fs_1.default.mkdirSync(outputDir, { recursive: true });
            }
            // Ensure that outputFilePath includes the filename, not just the directory
            const outputFilePath = path_1.default.join(outputDir, path_1.default.basename(file.path));
            try {
                if (isImage) {
                    // Process image using sharp
                    await (0, sharp_1.default)(file.path)
                        .resize(imgSize) // Example resize, can be adjusted or omitted
                        .jpeg({ quality: imgQuality })
                        .toFile(outputFilePath);
                }
                else {
                    // Process video using ffmpeg
                    await new Promise((resolve, reject) => {
                        (0, fluent_ffmpeg_1.default)(file.path)
                            .size(`${videoSize}x?`)
                            .output(outputFilePath)
                            .on('end', resolve)
                            .on('error', reject)
                            .run();
                    });
                }
                processedFiles.push(outputFilePath);
            }
            catch (err) {
                console.error(`Error processing file: ${file.path}`, err);
                throw err; // Re-throw to handle in the controller
            }
        }
        return processedFiles;
    },
    deleteTempFiles: (files) => {
        try {
            for (const file of files) {
                // await fs.remove(file.path);
                fs_1.default.unlinkSync(file.path); // Remove the file
            }
        }
        catch (err) {
            console.error('Error deleting temp files:', err);
        }
    }
};
exports.default = mediaProcessor;
