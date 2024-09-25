import {Product} from "../models/product";
import { OrderItemsType } from "../types/types";

export const reduceStock = async (orderItems:OrderItemsType[])=>{
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if(!product)throw new Error("Product not found");
        product.stock -= order.quantity;
        await product.save();
    }
};