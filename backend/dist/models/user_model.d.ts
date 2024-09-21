import mongoose from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string | undefined;
    phone: string;
    address: string;
    avatar: string;
    question: string;
    answer: string | undefined;
    role: "client" | "admin" | "vendor" | "driver";
    isBanned: boolean;
    orders: [];
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default User;
