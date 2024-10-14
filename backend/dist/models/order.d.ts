import mongoose from 'mongoose';
export declare const Order: mongoose.Model<{
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
    qrCode: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
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
    qrCode: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
}> & {
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
    qrCode: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
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
    qrCode: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
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
    qrCode: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
}>> & mongoose.FlatRecord<{
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
    qrCode: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
