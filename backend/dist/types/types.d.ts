import { Types } from "mongoose";
export type SearchRequestQuery = {
    name?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
};
export interface BaseQuery {
    name?: {
        $regex: string;
        $options?: string;
    };
    price?: {
        $lte: number;
    };
    category?: string;
}
export interface NewProductRequestBody {
    name: string;
    category: string;
    price: number;
    stock: number;
}
export type ShippingInfoType = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
};
export type OrderItemsType = {
    name: string;
    photo: string;
    price: number;
    productId: Types.ObjectId;
    quantity: number;
};
export interface NewOrderRequestBody {
    shippingInfo: ShippingInfoType;
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    orderItems: OrderItemsType[];
}
