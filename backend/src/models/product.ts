import mongoose from 'mongoose';
import deleteMedia from '../utils/deleteMedia';
import { IProduct } from '../types/types';
const {Schema } = mongoose;

const productSchema = new Schema(
    {
        name: {
          type: String,
          required: [true, "name is required"],
          unique:true
        },

        description: {
            type: String,
            default:""
        },

        price: { 
            type: Number,
            required: [true,"price is required"]
        },
        
        category: {
            type: String,
            required: [true, 'Category name is required'],
            trim:true
        },

        photos: { 
            type: [String],
            default: [] 
        },

        videos: { 
            type: [String],
            default: [] 
        },

        stock:{ 
            type:Number,
            required: [true, 'Stock QTY is required']
        },

        tags: { 
            type: [String],
            default : []
        },

        code: { 
            type: String,
            default: '' 
        },

        isAvailable:{
            type:Boolean,
            default:true
        },

        rating: {
            type: Number,
            default:1,
            min:1,
            max:5
        },
        
        ratingCount:{
            type: String,
            default: ''
        }
    },
    { timestamps:true }
);

// Pre-save middleware to convert category to lowercase
productSchema.pre('save', function(next) {
    if (this.category){this.category = this.category.toLowerCase()}
    next();
});

productSchema.post('findOneAndDelete', function(doc){ 
    if(doc && doc.photos.length>0){doc.photos.forEach((photo:any)=>{deleteMedia(photo)})}
    if(doc && doc.videos.length>0){doc.videos.forEach((video:any)=>{deleteMedia(video)})}
} );
export const Product = mongoose.model<IProduct>('Product', productSchema)