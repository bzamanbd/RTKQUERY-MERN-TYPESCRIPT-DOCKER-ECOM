import appErr from "../utils/appErr"
import 'dotenv/config'
import mongoose from 'mongoose'
import appRes from "../utils/appRes"
import { Request, Response, NextFunction } from "express";
import TryCatch from "../middlewares/tryCatch";
import { Coupon } from "../models/coupon";
import { stripe } from "../server";

export const createPaymentIntent = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{ 
        const {amount} =req.body; 
        if(!amount)return next(appErr('Please enter an amount',400));
        const paymentIntent = await stripe.paymentIntents.create({ 
            amount: Number(amount)*100, 
            currency:"usd",
        });
        appRes(res,200,'','Payment is done successfully',{ 
            clientSecret:paymentIntent.client_secret
        });
    }
);

export const newCoupon = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{
        const {coupon, amount} = req.body; 
        if(!coupon || !amount)return next(appErr('coupon and amount are required',400));
        const newCoupon = await Coupon.create({code:coupon, amount});
        appRes(res,201,'',`Coupon is created successfully`,{newCoupon})
    }
);

export const applyDiscount = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{
        const {coupon} = req.query; 
        const discount = await Coupon.findOne({code:coupon}); 
        if(!discount)return next(appErr('Invalid coupon code',400))
        appRes(res,200,'',`Coupon is found!`,{discount});
    }
);

export const allCoupons = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const coupons = await Coupon.find({}); 
        if(coupons.length<1)return appRes(res,200,'','No coupon found!',{coupons});
        appRes(res,200,'',`${coupons.length} coupons found`,{coupons});

    }
);

export const deleteCoupon = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{ 
        const {id} = req.params;
        if(!id) return next(appErr('id is required',400));
        if (!mongoose.Types.ObjectId.isValid(id)) return next(appErr('Invalid ID format',400));
        const coupon = await Coupon.findByIdAndDelete(id);
        if (!coupon) return next(appErr('Coupon not found!',404))
        appRes(res,200,'','Coupon is deleted successfully',{})
    }
);
