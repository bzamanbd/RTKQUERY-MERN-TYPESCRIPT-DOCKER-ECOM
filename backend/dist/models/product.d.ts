import mongoose from 'mongoose';
import { IProduct } from '../types/types';
export declare const Product: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct> & IProduct & {
    _id: mongoose.Types.ObjectId;
}, any>;
