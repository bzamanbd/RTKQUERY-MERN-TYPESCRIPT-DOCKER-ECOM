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

export type ShippingAddress = {
    address: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
}; 

export type OrderedItem = {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: string;
}; 

export type NewOrderRequestData = { 
    shippingAddress: ShippingAddress;
    discountCode: string; 
    orderedItems: OrderedItem[]
};

export type Item = { 
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: string;
    _id: string;

}

export type Order = { 
    shippingAddress: ShippingAddress;
    _id: string;
    items: Item[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: string;
    payment: number;
    status: string;
    createdAt: string;
}

export type MyOrdersResponse = { 
    message: string;
    data:{ 
        orders: Order[];
    }
}


export type MyOrderResponse = { 
    message: string;
    data:{ 
        order: { 
            _id: string;
            shippingAddress:ShippingAddress;
            items: Item [];
            subtotal: number;
            tax: number;
            shippingCharges: number;
            discount: number;
            total: number;
            customer: string;
            status: string;
            qrCode: string;
            createdAt: string;
        }
    }
}




