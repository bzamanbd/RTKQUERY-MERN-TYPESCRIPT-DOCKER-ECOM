import { Product, User } from "../vite-env";

export type MessageResponse = { 
    message: string;
    data: {
        user: User; 
        token: string;
    };
}

export type ProductResponse = { 
    success: string; 
    message: string; 
    data:{ 
        product: Product;
    }
}

export type CategoryResponse = { 
    success: string; 
    message: string; 
    data:{ 
        categories: string[];
    }
}

export type AllProductsResponse = { 
    success: string; 
    message: string; 
    data:{ 
        products: Product[];
    }
}
