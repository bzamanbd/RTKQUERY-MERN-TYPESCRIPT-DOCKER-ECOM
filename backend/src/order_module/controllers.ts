import { Product } from './../models/product';
import {Request, Response, NextFunction } from "express";
import TryCatch from "../middlewares/tryCatch";
import { NewOrderRequestBody} from "../types/types";
import appErr from "../utils/appErr";
import {Order} from "../models/order";
import { reduceStock } from "../utils/reduceStock";
import appRes from "../utils/appRes";

export const fetchOrders = TryCatch(
    async(req:Request,res:Response,next:NextFunction)=>{
        const orders = await Order.find({})
        if(orders.length<1){ 
            appRes(res,200,'','Order not found',{orders});
            return;
        }
        appRes(res,200,'',`${orders.length} Orders found!`,{orders})
    }
);

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

export const fetchOrder = TryCatch( 
    async(req:Request,res:Response,next:NextFunction)=>{ 
        
    }
);

export const deleteOrder = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{

    }
);
export const processOrder = TryCatch( 
    async(req:Request, res:Response,next:NextFunction)=>{

    }
);