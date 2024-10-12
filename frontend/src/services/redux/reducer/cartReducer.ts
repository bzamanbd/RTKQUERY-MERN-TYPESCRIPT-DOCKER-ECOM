import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartReducerInitialState, ShippingAddress } from "../../../types/reducer-types";

const initialState:CartReducerInitialState = { 
    loading:false,
    items:[], 
    subtotal:0,
    tax:0,
    shippingCharges:0,
    discount:0,
    couponCode:"",
    total:0,
    shippingAddress:{ 
        address:"",
        city:"",
        state:"",
        postCode:"",
        country:""
    }
} 


export const cartReducer = createSlice({ 
    name:'cartReducer',
    initialState,
    reducers:{ 
        addToCart:(state, action:PayloadAction<CartItem>)=>{ 
            state.loading = true;
            const index = state.items.findIndex((i)=>i.productId === action.payload.productId);
            if (index !== -1) {
                state.items[index] = action.payload;
            } else {
                state.items.push(action.payload);
            }
            state.loading = false;
        }, 

        removeCartItem:(state,action:PayloadAction<string>)=>{
            state.loading = true;
            state.items = state.items.filter((i)=>i.productId !==action.payload); 
            state.loading = false;
        },

        calculatePrice:(state)=>{
            const subtotal = state.items.reduce((total, item)=>total+item.price*item.quantity,0);
            state.subtotal = subtotal; 
            state.shippingCharges = 50; // Flat shipping charge
            state.tax = Math.round(state.subtotal*0.10);// 10% tax rate
            state.total = state.subtotal + state.shippingCharges + state.tax - state.discount;
        },

        discountApplied:(state, action:PayloadAction<number>)=>{ 
            state.discount = action.payload;
        },

        saveCouponCode:(state, action:PayloadAction<string>)=>{ 
            state.couponCode = action.payload;
        },

        saveShippingAddress:(state, action:PayloadAction<ShippingAddress>)=>{ 
            state.shippingAddress = action.payload;
        },

        resetCart:()=> initialState,

    }
});

export const {addToCart,removeCartItem,calculatePrice,discountApplied, saveCouponCode, saveShippingAddress,resetCart} = cartReducer.actions;