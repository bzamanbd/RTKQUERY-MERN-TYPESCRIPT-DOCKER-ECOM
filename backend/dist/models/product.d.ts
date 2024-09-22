/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import mongoose from 'mongoose';
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    photos: [];
    videos: [];
    stock: number;
    tags: [];
    code: string;
    isAvailable: boolean;
    rating: number;
    ratingCount: string;
}
declare const Product: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: string;
    photos: string[];
    videos: string[];
    stock: number;
    tags: string[];
    code: string;
    isAvailable: boolean;
    rating: number;
    ratingCount: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: string;
    photos: string[];
    videos: string[];
    stock: number;
    tags: string[];
    code: string;
    isAvailable: boolean;
    rating: number;
    ratingCount: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: string;
    photos: string[];
    videos: string[];
    stock: number;
    tags: string[];
    code: string;
    isAvailable: boolean;
    rating: number;
    ratingCount: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: string;
    photos: string[];
    videos: string[];
    stock: number;
    tags: string[];
    code: string;
    isAvailable: boolean;
    rating: number;
    ratingCount: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: string;
    photos: string[];
    videos: string[];
    stock: number;
    tags: string[];
    code: string;
    isAvailable: boolean;
    rating: number;
    ratingCount: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    price: number;
    category: string;
    photos: string[];
    videos: string[];
    stock: number;
    tags: string[];
    code: string;
    isAvailable: boolean;
    rating: number;
    ratingCount: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default Product;
