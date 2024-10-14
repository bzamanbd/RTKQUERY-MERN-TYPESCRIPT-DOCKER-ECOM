import { Types } from "mongoose";

export interface IUser  extends Document{ 
    name: string;
    email: string;
    password: string | undefined;
    phone: string;
    address: string;
    avatar: string;
    question: string;
    answer: string | undefined;
    role: "client" | "admin" | "vendor" | "driver";
    isBanned: boolean;
    orders: [];
}

export interface IProduct  extends Document{ 
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
}

export interface ICoupon extends Document{ 
    code: string; 
    amount: number;
}

export type SearchRequestQuery = { 
    search?:string,
    price?:string,
    category?:string,
    sort?:string,
    page?:string
};

export interface BaseQuery{ 
    name?:{$regex:string, $options?:string}, 
    price?:{$lte:number},
    category?:string
};

export interface NewProductRequestBody{ 
    name: string, 
    category: string, 
    price: number, 
    stock: number
};

export type ShippingAddressType = { 
    address: string;
    city: string;
    status: string; 
    country: string;
    postCode: string;
};

export type OrderItemsType = {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: Types.ObjectId;
};

export interface NewOrderRequestBody{ 
    shippingAddress: ShippingAddressType,
    orderedItems: OrderItemsType[]
    discountCode?: string,
};


