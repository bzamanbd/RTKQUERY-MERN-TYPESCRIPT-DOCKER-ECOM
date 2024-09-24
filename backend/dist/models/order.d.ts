import mongoose from 'mongoose';
declare const Order: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: {
            prototype?: mongoose.Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: {
            prototype?: mongoose.Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: {
            prototype?: mongoose.Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: {
            prototype?: mongoose.Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: {
            prototype?: mongoose.Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null | undefined;
        price?: number | null | undefined;
        photo?: string | null | undefined;
        quantity?: number | null | undefined;
        productId?: {
            prototype?: mongoose.Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default Order;
