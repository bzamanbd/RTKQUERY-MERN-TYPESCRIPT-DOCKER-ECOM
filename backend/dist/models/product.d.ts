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
