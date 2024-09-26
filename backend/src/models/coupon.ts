import mongoose from 'mongoose';
import { ICoupon } from '../types/types';
const { Schema } = mongoose;

const couponSchema = new Schema({
    code: { 
        type: String,
        required: [true, "Please enter the coupon code"],
        unique: true
    },
    amount: { 
        type: Number, 
        required: [true, "Please enter the discount amount"] 
    }
  },{timestamps:true} 
);

export const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema)
