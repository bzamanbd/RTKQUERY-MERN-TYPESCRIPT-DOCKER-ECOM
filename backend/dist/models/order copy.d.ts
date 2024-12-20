import mongoose from 'mongoose';
export declare const Order: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        photo?: string | null | undefined;
        price?: number | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    status: "Processing" | "Shipped" | "Delivered";
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: number;
        country: string;
    } | null | undefined;
    payment?: any;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        photo?: string | null | undefined;
        price?: number | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    status: "Processing" | "Shipped" | "Delivered";
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: number;
        country: string;
    } | null | undefined;
    payment?: any;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        photo?: string | null | undefined;
        price?: number | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    status: "Processing" | "Shipped" | "Delivered";
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: number;
        country: string;
    } | null | undefined;
    payment?: any;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        photo?: string | null | undefined;
        price?: number | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    status: "Processing" | "Shipped" | "Delivered";
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: number;
        country: string;
    } | null | undefined;
    payment?: any;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        photo?: string | null | undefined;
        price?: number | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    status: "Processing" | "Shipped" | "Delivered";
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: number;
        country: string;
    } | null | undefined;
    payment?: any;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        photo?: string | null | undefined;
        price?: number | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    status: "Processing" | "Shipped" | "Delivered";
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: number;
        country: string;
    } | null | undefined;
    payment?: any;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
