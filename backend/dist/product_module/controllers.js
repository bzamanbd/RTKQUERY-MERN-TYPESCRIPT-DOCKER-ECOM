"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.fetchProductById = exports.fetchLatestProduct = exports.fetchProductsWithFilter = exports.fetchProductsCats = exports.fetchProducts = exports.createProduct = void 0;
const appErr_1 = __importDefault(require("../utils/appErr"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const appRes_1 = __importDefault(require("../utils/appRes"));
const product_1 = require("../models/product");
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
    const existProduct = await product_1.Product.findOne({ name: payload.name });
    if (existProduct) {
        // Clean up temporary files
        (0, deleteTempFiles_1.default)([...photos, ...videos]);
        return next((0, appErr_1.default)(`${payload.name} is already exists`, 409));
    }
    const product = new product_1.Product(payload);
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
    const products = await product_1.Product.find({});
    if (products.length < 1) {
        (0, appRes_1.default)(res, 200, '', `Product not found!`, { products });
        return;
    }
    (0, appRes_1.default)(res, 200, '', `${products.length} Products found!`, { products });
});
exports.fetchProductsCats = (0, tryCatch_1.default)(async (req, res, next) => {
    const categories = await product_1.Product.distinct('category');
    if (categories.length < 1) {
        (0, appRes_1.default)(res, 200, '', `Categories not found!`, { categories });
        return;
    }
    (0, appRes_1.default)(res, 200, '', `${categories.length} Category found!`, { categories });
});
exports.fetchProductsWithFilter = (0, tryCatch_1.default)(async (req, res, next) => {
    const { name, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 4;
    //pagination
    const skip = (page - 1) * limit;
    const baseQuery = {};
    if (name)
        baseQuery.name = { $regex: name, $options: 'i' };
    if (price)
        baseQuery.price = { $lte: Number(price) };
    if (category)
        baseQuery.category = category;
    const productsPromise = product_1.Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);
    const [products, filteredOnlyProduct] = await Promise.all([productsPromise, product_1.Product.find(baseQuery)]);
    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
    (0, appRes_1.default)(res, 200, '', `${products.length} product found`, { products, totalPage });
});
exports.fetchLatestProduct = (0, tryCatch_1.default)(async (req, res, next) => {
    const products = await product_1.Product.find({}).sort({ createdAt: -1 }).limit(5);
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
    const product = await product_1.Product.findById({ _id });
    if (!product)
        return next((0, appErr_1.default)('Product not found!', 404));
    (0, appRes_1.default)(res, 200, '', `${product.name} found!`, { product });
});
exports.editProduct = (0, tryCatch_1.default)(async (req, res, next) => {
    const _id = req.params.id;
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
    ;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
        (0, deleteTempFiles_1.default)([...photos, ...videos]);
        return next((0, appErr_1.default)('Invalid ID format', 400));
    }
    ;
    if (!_id) {
        (0, deleteTempFiles_1.default)([...photos, ...videos]);
        return next((0, appErr_1.default)('id is required', 400));
    }
    ;
    try {
        const product = await product_1.Product.findById(_id);
        if (!product) {
            (0, deleteTempFiles_1.default)([...photos, ...videos]);
            return next((0, appErr_1.default)('product not found', 404));
        }
        ;
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
        ;
        // Add new videos
        if (videos) {
            // Process and move videos
            const processedVideos = await mediaProcessor_1.default.processAndMoveMedia({ files: videos, destinationDir: 'videos', isImage: false, videoSize: 360 });
            const productVideos = [];
            (0, pathTrimmer_1.pathTrimmer)({ items: processedVideos, newItems: productVideos });
            product.videos.push(...productVideos);
            await product.save();
        }
        ;
        // Update other fields if necessary
        if (payload.name)
            product.name = payload.name;
        if (payload.description)
            product.description = payload.description;
        if (payload.price)
            product.price = payload.price;
        if (payload.category)
            product.category = payload.category;
        if (payload.stock)
            product.stock = payload.stock;
        if (payload.code)
            product.code = payload.code;
        if (payload.isAvailable)
            product.isAvailable = payload.isAvailable;
        // Save the updated product
        await product.save();
        // Clean up temporary files
        (0, deleteTempFiles_1.default)([...photos, ...videos]);
        (0, appRes_1.default)(res, 200, '', `${product.name} is updated!`, { product });
    }
    catch (e) {
        (0, deleteTempFiles_1.default)([...photos, ...videos]);
        return next((0, appErr_1.default)(e.message, 500));
    }
});
exports.deleteProduct = (0, tryCatch_1.default)(async (req, res, next) => {
    const _id = req.params.id;
    if (!_id)
        return next((0, appErr_1.default)('id is required', 400));
    if (!mongoose_1.default.Types.ObjectId.isValid(_id))
        return next((0, appErr_1.default)('Invalid ID format', 400));
    const product = await product_1.Product.findById({ _id });
    if (!product)
        return next((0, appErr_1.default)('Product not found!', 404));
    await product_1.Product.findByIdAndDelete({ _id });
    (0, appRes_1.default)(res, 200, '', `${product.name} is deleted!`, {});
});
