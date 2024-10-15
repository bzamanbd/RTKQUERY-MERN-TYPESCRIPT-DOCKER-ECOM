import mongoose from 'mongoose';
export declare const Order: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    status: "Processing" | "Shipped" | "Delivered";
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    invoicePath: string;
    qrCode: string;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    status: "Processing" | "Shipped" | "Delivered";
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    invoicePath: string;
    qrCode: string;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    status: "Processing" | "Shipped" | "Delivered";
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    invoicePath: string;
    qrCode: string;
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    status: "Processing" | "Shipped" | "Delivered";
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    invoicePath: string;
    qrCode: string;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    status: "Processing" | "Shipped" | "Delivered";
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    invoicePath: string;
    qrCode: string;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        country: string;
    } | null | undefined;
    payment?: any;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    items: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: mongoose.Types.ObjectId | null | undefined;
    }>;
    status: "Processing" | "Shipped" | "Delivered";
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    customer: mongoose.Types.ObjectId;
    invoicePath: string;
    qrCode: string;
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
