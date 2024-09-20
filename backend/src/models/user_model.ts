import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IUser extends Document{ 
    name: string,
    email:string,
    password:string | undefined,
    phone:string,
    address:string,
    avatar:string,
    question:string,
    answer:string | undefined,
    role:"client" | "admin" | "vendor" | "driver",
    isBanned:boolean,

}


const userSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, "user name is required"],
        },

        email:{ 
            type: String,
            required: [true, "email name is required"],
            unique: true,
        },

        password:{ 
            type: String,
            required: [true, "password is required"],
        },

        phone: {
            type: String,
            required: [true, "phone number is require"],
        },
        
        address: { 
            type: String 
        },

        avatar: {
            type: String,
            default: "",
        },

        question: {
            type: String,
            required: [true, "Question to reset password is required"],
        },
        
        answer: {
            type: String,
            required: [true, "Answer to reset password is required"],
        },

        role: {
            type: String,
            default: "client",
            enum: ["client", "admin", "vendor", "driver"],
        },
        isBanned:{ 
            type: Boolean, 
            default: false
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }],
        
    },
    { timestamps:true }
);
const User = mongoose.model<IUser>('User', userSchema);
export default User