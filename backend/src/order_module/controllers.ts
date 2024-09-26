import { Product } from './../models/product';
import {Request, Response, NextFunction } from "express";
import TryCatch from "../middlewares/tryCatch";
import { NewOrderRequestBody} from "../types/types";
import appErr from "../utils/appErr";
import {Order} from "../models/order";
import { reduceStock } from "../utils/reduceStock";
import appRes from "../utils/appRes";
import mongoose from 'mongoose';

export const createOrder = TryCatch( 
    async(req:Request<{},{}, NewOrderRequestBody>,res:Response,next:NextFunction)=>{ 
        const {orderedItems, shippingAddress, discountCode } = req.body; 
        if(!orderedItems || !shippingAddress)return next(appErr('Please Enter all Fields',400)); 
        const processedItems = await Promise.all( 
            orderedItems.map(async (orderedItem)=>{ 
                const product = await Product.findById(orderedItem.productId);
                if(!product)throw new Error(`Product with id ${orderedItem.productId} not found`) 
                return{ 
                    name: product.name,
                    photo: product.photos[0],
                    price: product.price,
                    quantity: orderedItem.quantity,
                    productId: product._id
                }
            })
        );
        
        // Calculate subtotal, tax, shipping, and total
        const subtotal = processedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const tax = subtotal * 0.1; // 10% tax rate
        const shippingCharges = 50; // Flat shipping charge
        let discount = 0; // Discount will be calculated based on discountCode 
        if (discountCode) {
            // Example: apply a 10% discount if the discount code is valid
            discount = subtotal * 0.1; // 10% discount for demonstration
        }
        const total = subtotal + tax + shippingCharges - discount;

        const order = await Order.create({ 
            shippingAddress,
            items: processedItems,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total,
            customer: req.user._id,
            payment: total,
        });
        await reduceStock(processedItems); 
        appRes(res,201,'','New order created',{order})
    }
);

export const fetchOrders = TryCatch(
    async(req:Request,res:Response,next:NextFunction)=>{
        const orders = await Order.find({}).populate("customer","name");
        if(orders.length<1)return appRes(res,200,'',`Orders not found!`,{orders})
        appRes(res,200,'',`${orders.length} Orders found!`,{orders})
    }
);

export const fetchOrder = TryCatch( 
    async(req:Request,res:Response,next:NextFunction)=>{ 
        const orderId = req.params.id 
        if(!orderId) return next(appErr('id is required',400))
        if (!mongoose.Types.ObjectId.isValid(orderId)) return next(appErr('Invalid ID format',400)) 
        const order = await Order.findById({_id:orderId}).populate("customer","name");
        if(!order)return appRes(res,200,'',`Order not found!`,{order});
        appRes(res,200,'',`Order found!`,{order});
    }
);

export const myOrders = TryCatch(
    async(req:Request,res:Response,next:NextFunction)=>{
        const userId = req.user?._id;
        if (!mongoose.Types.ObjectId.isValid(userId)) return next(appErr('Invalid ID format',400))
        const orders = await Order.find({customer:userId})
        if(!orders)return appRes(res,200,'',`Orders not found!`,{orders})
        appRes(res,200,'',`Orders found!`,{orders})
    }
);

export const deleteOrder = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{
        const orderId = req.params.id; 
        if(!mongoose.Types.ObjectId.isValid(orderId)) return next(appErr('Invalid ID format',400))
        await Order.findByIdAndDelete(orderId);
        appRes(res,200,'','Order is deleted successfully',{});
    }
);

export const deleteOwnOrder = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{
        const userId = req.user._id;
        if(!mongoose.Types.ObjectId.isValid(userId)) return next(appErr('Invalid ID format',400))
        await Order.findOneAndDelete({customer:userId}); 
        appRes(res,200,'','Order is deleted successfully',{});
    }
);

export const updateOrderStatus = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{
        const {id} = req.params;
        const {status} = req.body;
        const validStatuses = ["Processing","Shipped","Delivered"];
        if(!validStatuses.includes(status))return appRes(res,200,'','Invalid status',{});
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
          );
        if(!updatedOrder)return next(appErr('No order found!',404));
        appRes(res,200,'','Order updated successfully',{updatedOrder});
    }
);