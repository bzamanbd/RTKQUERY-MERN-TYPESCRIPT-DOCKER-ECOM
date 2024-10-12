import { User } from "../vite-env";

export interface UserReducerInitialState{ 
    user: User | null; 
    isLoading: boolean; 
    token: string | null;
}

export interface CartItem{ 
    productId: string;
    name: string; 
    photo: string;
    price: number;
    quantity: number;
    stock: number;   
}

export interface ShippingAddress{ 
    address: string;
    city: string;
    state: string,
    postCode: string;
    country: string;
}

export interface CartReducerInitialState{ 
    loading: boolean; 
    items: CartItem[]; 
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    couponCode: string;
    total: number;
    shippingAddress:ShippingAddress;
}




