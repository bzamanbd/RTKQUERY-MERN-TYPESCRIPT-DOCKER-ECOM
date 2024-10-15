import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { MyOrderResponse, MyOrdersResponse, NewOrderRequestData } from "../../../types/api-types";
export const  orderAPI = createApi({ 
    reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/orders/`,
        prepareHeaders: (headers, {getState})=>{
            const state = getState() as RootState; 
            const token = state.userReducer.token; 
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
                headers.set('Origin','http://localhost:5173');
            }
            return headers;
        }
    }),
    tagTypes: ['Orders'], // Add a tag for products
    endpoints:(builder)=>({         
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createOrder:builder.mutation<any, NewOrderRequestData>({ 
            query: (orderData)=>({ 
                url:"new",
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ['Orders'], // Invalidate the products cache
        }),

        myOrders:builder.query<MyOrdersResponse, string>({ 
            query: ()=>"", 
            providesTags: ['Orders'], // Tag for products query
        }),

        myOrderById:builder.query<MyOrderResponse, string>({ 
            query: (id:string)=>{ 
                const base = `own/${id}`;
                return base;
            },
            providesTags: ['Orders'], // Tag for products query
        }),


    }), 
})

export const {useCreateOrderMutation,useMyOrdersQuery, useMyOrderByIdQuery} = orderAPI;