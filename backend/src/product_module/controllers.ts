import appErr from "../utils/appErr"
import 'dotenv/config'
import mongoose from 'mongoose'
import appRes from "../utils/appRes"
import {Product} from '../models/product';
import mediaProcessor from '../utils/mediaProcessor'
import { pathTrimmer } from '../utils/pathTrimmer';
import { deleteFile } from "../utils/oldImageRemover";
import { Request, Response, NextFunction } from "express";
import TryCatch from "../middlewares/tryCatch";
import deleteTempFiles from "../utils/deleteTempFiles";
import { BaseQuery, SearchRequestQuery } from "../types/types";

export const createProduct = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{
        const payload = req.body;
        let photos: Express.Multer.File[] = [];
        let videos: Express.Multer.File[] = [];
        if (Array.isArray(req.files)){
            // If files are not grouped by field name, process as a general array
            photos = req.files;
        } else if (req.files && typeof req.files === 'object') {
            // If files are grouped by field names (e.g., photos, videos)
            photos = req.files['photos'] || [];  // Handle photos
            videos = req.files['videos'] || [];  // Handle videos
        }
        const imageFolderName = 'photos'; // Dynamic folder name for photos
        const videoFolderName = 'videos'; // Dynamic folder name for videos
        if(!payload.name || !payload.price || !payload.category || !payload.stock){
            deleteTempFiles([...photos, ...videos]);
            return next(appErr('Product name, price, category & stock are required',400));
        }
        const existProduct = await Product.findOne({name:payload.name});
        if(existProduct){
            // Clean up temporary files
            deleteTempFiles([...photos, ...videos]);
            return next(appErr(`${payload.name} is already exists`,409));
        }
        const product = new Product(payload);
        await product.save();
        if(product){
            // Process and move photos
            const processedPhotos = photos.length > 0 ? await mediaProcessor.processAndMoveMedia({files:photos,destinationDir:imageFolderName,imgSize:50,imgQuality:80}) : [];
            // Process and move videos
            const processedVideos = videos.length > 0 ? await mediaProcessor.processAndMoveMedia({files:videos,destinationDir:videoFolderName,isImage:false,videoSize:360}) : [];
            const productPhotos:[] = [];
            const productVideos:[] = [];
            pathTrimmer({items:processedPhotos,newItems:productPhotos});
            pathTrimmer({items:processedVideos,newItems:productVideos});
            product.photos = productPhotos;
            product.videos = productVideos;
            await product.save();
        };
        //product creation is completed then delete uploaded files from temp
        deleteTempFiles([...photos, ...videos]);
        appRes(res,201,'',`${product.name} is created!`,{product})
    }
);

export const fetchProducts = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{
        const products = await Product.find({})
        if (products.length<1){
            appRes(res,200,'',`Product not found!`,{products}); 
            return;
        }
        appRes(res,200,'',`${products.length} Products found!`,{products})
    }
);

export const fetchProductsCats = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{
        const categories = await Product.distinct('category');
        if(categories.length<1)return appRes(res,200,'',`Categories not found!`,{categories});
        appRes(res,200,'',`${categories.length} Category found!`,{categories});
    }
);

export const fetchProductsWithFilter = TryCatch( 
    async(req:Request<{},{},{}, SearchRequestQuery>, res:Response, next:NextFunction)=>{ 
        const { search, sort,category, price} = req.query; 
        const page = Number(req.query.page) || 1; 
        const limit = Number(process.env.PRODUCT_PER_PAGE) || 4
        //pagination
        const skip = (page - 1) * limit; 

        const baseQuery:BaseQuery = {};
        if(search)baseQuery.name={$regex:search, $options:'i'};
        if(price)baseQuery.price={$lte:Number(price)};
        if(category)baseQuery.category=category;

        const productsPromise = Product.find(baseQuery)
            .sort(sort && {price : sort === "asc" ? 1 : -1 })
            .limit(limit) 
            .skip(skip)
        const [products, filteredOnlyProduct] = await Promise.all([productsPromise, Product.find(baseQuery)]);
        const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

        appRes(res,200,'',`${products.length} product found`,{products,totalPage})

    }
);

export const fetchLatestProduct = TryCatch( 
    async(req:Request,res:Response,next:NextFunction)=>{ 
        const products = await Product.find({}).sort({createdAt:-1}).limit(5);
        if (products.length<1) return appRes(res,200,'',`${products.length} product found!`,{products})
        appRes(res,200,'',`${products.length} Products found!`,{products})
    }
);

export const fetchProductById = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{ 
        const _id = req.params.id 
        if(!_id) return next(appErr('id is required',400))
        if (!mongoose.Types.ObjectId.isValid(_id)) return next(appErr('Invalid ID format',400)) 
        const product = await Product.findById({_id})
        if (!product) return appRes(res,200,'',`product found!`,{product})
        appRes(res,200,'',`${product.name} found!`,{product})
    }
);

export const editProduct = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{ 
        const {id} = req.params;
        console.log("Product ID===>",id);
        const payload = req.body;
        let photos: Express.Multer.File[] = [];
        let videos: Express.Multer.File[] = [];
        if (Array.isArray(req.files)){
            // If files are not grouped by field name, process as a general array
            photos = req.files;
        } else if (req.files && typeof req.files === 'object'){
            // If files are grouped by field names (e.g., photos, videos)
            photos = req.files['photos'] || [];  // Handle photos
            videos = req.files['videos'] || [];  // Handle videos
        };
        if (!mongoose.Types.ObjectId.isValid(id)){
            deleteTempFiles([...photos, ...videos]);
            return next(appErr('Invalid ID format',400));
        };
        if(!id){
            deleteTempFiles([...photos, ...videos]);
            return next(appErr('id is required',400));
        }; 
        try {
            const product = await Product.findById({_id:id});
            if (!product){
                deleteTempFiles([...photos, ...videos]);
                return next(appErr('product not found',404));
            };
            // Handle photos and videos to remove
            let photosToRemove = req.body.photosToRemove ? JSON.parse(req.body.photosToRemove) : [];
            let videosToRemove = req.body.videosToRemove ? JSON.parse(req.body.videosToRemove) : [];
            // Remove old photos
            photosToRemove.forEach((photoUrl:any) => {
                deleteFile(photoUrl); // Utility function to delete file from server
                product!.photos = product!.photos.filter((img:any) => img !== photoUrl);
            });
            // Remove old videos
            videosToRemove.forEach((videoUrl:any) => {
                deleteFile(videoUrl); // Utility function to delete file from server
                product!.videos = product!.videos.filter((vid:any) => vid !== videoUrl);
            });
            // Add new photos
            if (photos){
                // Process and move photos
                const processedPhotos = await mediaProcessor.processAndMoveMedia({files:photos,destinationDir:'photos',imgSize:50,imgQuality:80});
                const productPhotos:[] = []
                pathTrimmer({items:processedPhotos,newItems:productPhotos})
                product!.photos.push(...productPhotos);
                await product!.save();
            };
            // Add new videos
            if (videos){ 
                // Process and move videos
                const processedVideos = await mediaProcessor.processAndMoveMedia({files:videos, destinationDir:'videos',isImage:false,videoSize:360});
                const productVideos:[] = []
                pathTrimmer({items:processedVideos,newItems:productVideos}) 
                product!.videos.push(...productVideos);
                await product!.save();
            };
            // Update other fields if necessary
            if (payload.name) product!.name = payload.name;
            if (payload.description) product!.description = payload.description;
            if (payload.price) product!.price = payload.price;
            if (payload.category) product!.category = payload.category;
            if (payload.stock) product!.stock = payload.stock;
            if (payload.code) product!.code = payload.code;
            if (payload.isAvailable) product!.isAvailable = payload.isAvailable;
            // Save the updated product
            await product!.save();
            // Clean up temporary files
            deleteTempFiles([...photos, ...videos]);
            appRes(res,200,'',`${product!.name} is updated!`,{product});
        } catch (e:any) {
            deleteTempFiles([...photos, ...videos]);
            return next(appErr(e.message,500))
    
        }
    }
);

export const deleteProduct = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{ 
        const _id = req.params.id 
        if(!_id) return next(appErr('id is required',400))
        if (!mongoose.Types.ObjectId.isValid(_id)) return next(appErr('Invalid ID format',400))
        const product = await Product.findById({_id})
        if (!product) return next(appErr('Product not found!',404))
        await Product.findByIdAndDelete({_id})
        appRes(res,200,'',`${product.name} is deleted!`,{})
    }
);
