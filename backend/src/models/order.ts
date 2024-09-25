import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    shippingAddress: { 
        address:{ 
            type: String,
            required: true,
        },
        city:{ 
            type: String, 
            required: true
        },
        state:{ 
            type: String, 
            required: true
        }, 
        postCode:{ 
            type: Number, 
            required: true
        },
        country:{ 
            type: String, 
            required: true
        }
    },
    items: [
        { 
            name: String,
            photo: String, 
            price: Number,
            quantity: Number,
            productId:{ type: Schema.Types.ObjectId, ref: "Product"}
        }
    ],
    subtotal: {
        type: Number, 
        required: true 
    },
    tax: { 
        type: Number, 
        required: true 
    },
    shippingCharges: { 
        type: Number, 
        required: true 
    },
    discount: { 
        type: Number, 
        default: 0 
    },
    total: { 
        type: Number, 
        required: true 
    },
    customer: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    payment:{},
    status:{ 
        type:String,
        enum:["Processing","Shipped","Delivered"],
        default:"Processing"
    },
  },{timestamps:true} 
);

export const Order = mongoose.model('Order', orderSchema)
