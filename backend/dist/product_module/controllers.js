"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.deleteProduct = exports.editProduct = exports.fetchProductById = exports.fetchLatestProduct = exports.fetchProducts = exports.createProduct = void 0;
const appErr_1 = __importDefault(require("../utils/appErr"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const appRes_1 = __importDefault(require("../utils/appRes"));
const product_1 = __importDefault(require("../models/product"));
const mediaProcessor_1 = __importDefault(require("../utils/mediaProcessor"));
const pathTrimmer_1 = require("../utils/pathTrimmer");
const oldImageRemover_1 = require("../utils/oldImageRemover");
const tryCatch_1 = __importDefault(require("../middlewares/tryCatch"));
const deleteTempFiles_1 = __importDefault(require("../utils/deleteTempFiles"));
exports.createProduct = (0, tryCatch_1.default)(async (req, res, next) => {
    const payload = req.body;
    let photos = [];
    let videos = [];
    if (Array.isArray(req.files)) {
        // If files are not grouped by field name, process as a general array
        photos = req.files;
    }
    else if (req.files && typeof req.files === 'object') {
        // If files are grouped by field names (e.g., photos, videos)
        photos = req.files['photos'] || []; // Handle photos
        videos = req.files['videos'] || []; // Handle videos
    }
    const imageFolderName = 'photos'; // Dynamic folder name for photos
    const videoFolderName = 'videos'; // Dynamic folder name for videos
    if (!payload.name || !payload.price || !payload.category || !payload.stock) {
        (0, deleteTempFiles_1.default)([...photos, ...videos]);
        return next((0, appErr_1.default)('Product name, price, category & stock are required', 400));
    }
    const existProduct = await product_1.default.findOne({ name: payload.name });
    if (existProduct) {
        // Clean up temporary files
        (0, deleteTempFiles_1.default)([...photos, ...videos]);
        return next((0, appErr_1.default)(`${payload.name} is already exists`, 409));
    }
    const product = new product_1.default(payload);
    await product.save();
    if (product) {
        // Process and move photos
        const processedPhotos = photos.length > 0 ? await mediaProcessor_1.default.processAndMoveMedia({ files: photos, destinationDir: imageFolderName, imgSize: 50, imgQuality: 80 }) : [];
        // Process and move videos
        const processedVideos = videos.length > 0 ? await mediaProcessor_1.default.processAndMoveMedia({ files: videos, destinationDir: videoFolderName, isImage: false, videoSize: 360 }) : [];
        const productPhotos = [];
        const productVideos = [];
        (0, pathTrimmer_1.pathTrimmer)({ items: processedPhotos, newItems: productPhotos });
        (0, pathTrimmer_1.pathTrimmer)({ items: processedVideos, newItems: productVideos });
        product.photos = productPhotos;
        product.videos = productVideos;
        await product.save();
    }
    ;
    //product creation is completed then delete uploaded files from temp
    (0, deleteTempFiles_1.default)([...photos, ...videos]);
    (0, appRes_1.default)(res, 201, '', `${product.name} is created!`, { product });
});
exports.fetchProducts = (0, tryCatch_1.default)(async (req, res, next) => {
    const products = await product_1.default.find({});
    if (!products)
        return next((0, appErr_1.default)('Product not found!', 404));
    if (products.length < 1)
        return (0, appRes_1.default)(res, 200, 'False', `${products.length} product found!`, { products });
    (0, appRes_1.default)(res, 200, '', `${products.length} Products found!`, { products });
});
exports.fetchLatestProduct = (0, tryCatch_1.default)(async (req, res, next) => {
    const products = await product_1.default.find({}).sort({ createdAt: -1 }).limit(5);
    if (products.length < 1)
        return (0, appRes_1.default)(res, 200, '', `${products.length} product found!`, { products });
    (0, appRes_1.default)(res, 200, '', `${products.length} Products found!`, { products });
});
exports.fetchProductById = (0, tryCatch_1.default)(async (req, res, next) => {
    const _id = req.params.id;
    if (!_id)
        return next((0, appErr_1.default)('id is required', 400));
    if (!mongoose_1.default.Types.ObjectId.isValid(_id))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    const product = await product_1.default.findById({ _id });
    if (!product)
        return next((0, appErr_1.default)('Product not found!', 404));
    (0, appRes_1.default)(res, 200, '', `${product.name} found!`, { product });
});
const editProduct = async (req, res, next) => {
    const _id = req.params.id;
    const files = req.files;
    const photos = files.photos;
    const videos = files.videos;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
        //product update fails, so,delete uploaded files from temp
        // if(req.files)mediaProcessor.deleteTempFiles([...photos, ...videos]);
        return next((0, appErr_1.default)('Invalid ID format', 400));
    }
    if (!_id) {
        //product update fails, so,delete uploaded files from temp
        // if(req.files)mediaProcessor.deleteTempFiles([...photos, ...videos]);
        return next((0, appErr_1.default)('id is required', 400));
    }
    try {
        const product = await product_1.default.findById(_id);
        if (!product) {
            //product update fails, so,delete uploaded files from temp
            // if(req.files)mediaProcessor.deleteTempFiles([...photos, ...videos]);
            return next((0, appErr_1.default)('product not found', 404));
        }
        // Handle photos and videos to remove
        let photosToRemove = req.body.photosToRemove ? JSON.parse(req.body.photosToRemove) : [];
        let videosToRemove = req.body.videosToRemove ? JSON.parse(req.body.videosToRemove) : [];
        // Remove old photos
        photosToRemove.forEach((photoUrl) => {
            (0, oldImageRemover_1.deleteFile)(photoUrl); // Utility function to delete file from server
            product.photos = product.photos.filter((img) => img !== photoUrl);
        });
        // Remove old videos
        videosToRemove.forEach((videoUrl) => {
            (0, oldImageRemover_1.deleteFile)(videoUrl); // Utility function to delete file from server
            product.videos = product.videos.filter((vid) => vid !== videoUrl);
        });
        // Add new photos
        if (photos) {
            // Process and move photos
            const processedPhotos = await mediaProcessor_1.default.processAndMoveMedia({ files: photos, destinationDir: 'photos', imgSize: 50, imgQuality: 80 });
            const productPhotos = [];
            (0, pathTrimmer_1.pathTrimmer)({ items: processedPhotos, newItems: productPhotos });
            product.photos.push(...productPhotos);
            await product.save();
        }
        // Add new videos
        if (videos) {
            // Process and move videos
            const processedVideos = await mediaProcessor_1.default.processAndMoveMedia({ files: videos, destinationDir: 'videos', isImage: false, videoSize: 360 });
            const productVideos = [];
            (0, pathTrimmer_1.pathTrimmer)({ items: processedVideos, newItems: productVideos });
            product.videos.push(...productVideos);
            await product.save();
        }
        // Update other fields if necessary
        if (req.body.name)
            product.name = req.body.name;
        if (req.body.description)
            product.description = req.body.description;
        if (req.body.price)
            product.price = req.body.price;
        if (req.body.category)
            product.category = req.body.category;
        if (req.body.stock)
            product.stock = req.body.stock;
        if (req.body.code)
            product.code = req.body.code;
        if (req.body.isAvailable)
            product.isAvailable = req.body.isAvailable;
        // Save the updated food item
        await product.save();
        // Clean up temporary files
        if (photos) {
            // await mediaProcessor.deleteTempFiles(req.files?['photos']:[])
        }
        if (Array.isArray(req.files ? ['videos'] : [])) {
            // await mediaProcessor.deleteTempFiles(req.files?['videos']:[])
        }
        (0, appRes_1.default)(res, 200, '', `${product.name} is updated!`, { product });
    }
    catch (e) {
        // Clean up temporary files
        if (Array.isArray(req.files ? ['photos'] : [])) {
            // await mediaProcessor.deleteTempFiles(req.files?['photos']:[])
        }
        if (Array.isArray(req.files ? ['videos'] : [])) {
            // await mediaProcessor.deleteTempFiles(req.files?['videos']:[])
        }
        return next((0, appErr_1.default)(e.message, 500));
    }
};
exports.editProduct = editProduct;
exports.deleteProduct = (0, tryCatch_1.default)(async (req, res, next) => {
    const _id = req.params.id;
    if (!_id)
        return next((0, appErr_1.default)('id is required', 400));
    if (!mongoose_1.default.Types.ObjectId.isValid(_id))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    const product = await product_1.default.findById({ _id });
    if (!product)
        return next((0, appErr_1.default)('Product not found!', 404));
    await product_1.default.findByIdAndDelete({ _id });
    (0, appRes_1.default)(res, 200, '', `${product.name} is deleted!`, {});
});
const getCategories = async (req, res) => {
    try {
        // Fetch distinct 'category' values without any filters
        const categories = await product_1.default.distinct('category');
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};
exports.getCategories = getCategories;
