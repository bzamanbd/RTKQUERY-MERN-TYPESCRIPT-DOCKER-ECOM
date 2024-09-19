/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: any;
    phone: string;
    avatar: string;
    question: string;
    answer: any;
    role: "client" | "admin" | "vendor" | "driver";
    orders: mongoose.Types.ObjectId[];
    address?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: any;
    phone: string;
    avatar: string;
    question: string;
    answer: any;
    role: "client" | "admin" | "vendor" | "driver";
    orders: mongoose.Types.ObjectId[];
    address?: string | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: any;
    phone: string;
    avatar: string;
    question: string;
    answer: any;
    role: "client" | "admin" | "vendor" | "driver";
    orders: mongoose.Types.ObjectId[];
    address?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: any;
    phone: string;
    avatar: string;
    question: string;
    answer: any;
    role: "client" | "admin" | "vendor" | "driver";
    orders: mongoose.Types.ObjectId[];
    address?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: any;
    phone: string;
    avatar: string;
    question: string;
    answer: any;
    role: "client" | "admin" | "vendor" | "driver";
    orders: mongoose.Types.ObjectId[];
    address?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: any;
    phone: string;
    avatar: string;
    question: string;
    answer: any;
    role: "client" | "admin" | "vendor" | "driver";
    orders: mongoose.Types.ObjectId[];
    address?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default User;
