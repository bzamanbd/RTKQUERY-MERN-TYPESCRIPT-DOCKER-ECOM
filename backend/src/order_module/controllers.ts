import {Request, Response, NextFunction } from "express";
import TryCatch from "../middlewares/tryCatch";
import { NewOrderRequestBody } from "../types/types";
import appErr from "../utils/appErr";
import Order from "../models/order";
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
    async(req:Request<{},{},NewOrderRequestBody>,res:Response,next:NextFunction)=>{ 
        const {shippingInfo,orderItems,user,subtotal,tax,shippingCharges,discount,total} = req.body; 
        if(!shippingInfo || !orderItems || !user|| !subtotal || !tax || !shippingCharges || !discount || !total)return next(appErr('Please Enter all Fields',400));

        const order = await Order.create({ 
            shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total
        });

        await reduceStock(orderItems); 
        
        appRes(res,201,'True','New order created',{order})
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