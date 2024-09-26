import mongoose from 'mongoose';
import { ICoupon } from '../types/types';
export declare const Coupon: mongoose.Model<ICoupon, {}, {}, {}, mongoose.Document<unknown, {}, ICoupon> & ICoupon & {
    _id: mongoose.Types.ObjectId;
}, any>;
