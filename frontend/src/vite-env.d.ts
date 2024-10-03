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
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    photos: string[];
    videos: string[];
    _id: string;
  }

