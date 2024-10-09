/// <reference types="vite-plugin-svgr/client" />

/// <reference types="vite/client" />

import { Product } from './../../backend/src/models/product';

interface ImportMetaEnv {
    readonly VITE_SERVER: string;
    // Add other environment variables here    
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

export type User = {
    name?: string;
    email?: string;
    password?: string,
    phone?: string;
    address?: string;
    avatar?: string;
    question?: string;
    role?: string;
    isBanned?: boolean;
    orders?: []
}

export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    photos: string[];
    videos: string[];
}

export type SearchProductRequest = { 
    search?:string,
    price?:number,
    category?:string,
    sort?:string,
    page?:number
};

export type SearchProductResponse = { 
    success: string; 
    message: string; 
    data: {
        products: Product[],
        totalPage: number
    }
};




