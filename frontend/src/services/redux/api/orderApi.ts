import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {  MyOrderResponse, MyOrdersResponse, NewOrderRequestData, Order, UpdateOrderStatusResponse } from "../../../types/api-types";

import { getSocket } from "../../../socket";


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

        allOrders:builder.query<MyOrdersResponse, void>({ 
            query: ()=>"all",
            async onCacheEntryAdded(_,{updateCachedData, cacheDataLoaded, cacheEntryRemoved}){
                // Connect to the socket
                const socket = getSocket(); 
                try {
                    await cacheDataLoaded;
                    // Listen for new orders and update the cache
                    socket?.on('newOrder',(newOrder:Order)=>{ 
                        updateCachedData((draft)=>{ 
                            if(Array.isArray(draft)){ 
                                draft.unshift(newOrder);
                            }
                        })
                    })
                } catch (error) {
                    console.error('Error handling new order via socket:', error);
                }
                // Cleanup when cache subscription is removed
                await cacheEntryRemoved;
                socket?.off('newOrder');
            },
            providesTags: ['Orders'], // Tag for products query
        }),

        fetchOrderById:builder.query<MyOrderResponse, string>({ 
            query: (id:string)=>(id),
            providesTags: ['Orders'], // Tag for products query
        }),

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        deleteOrderById:builder.mutation<any, string>({ 
            query: (id:string)=>({ 
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Orders'], // Invalidate the products cache
        }),        
        
        updateOrderStatus:builder.mutation<UpdateOrderStatusResponse, { id: string; status: string }>({ 
            query: ({id, status})=>({ 
                url: `${id}`,
                method: "PUT",
                body: {status}
            }),
            invalidatesTags: ['Orders'], // Invalidate the products cache
        }),

        markOrderAsViewed:builder.mutation<UpdateOrderStatusResponse, { id: string; viewed: boolean }>({ 
            query: ({id, viewed})=>({ 
                url: `${id}`,
                method: "PATCH",
                body: {viewed}
            }),
            invalidatesTags: ['Orders'], // Invalidate the products cache
        }),

    }), 
})

export const {useCreateOrderMutation,useMyOrdersQuery, useMyOrderByIdQuery,useAllOrdersQuery, useFetchOrderByIdQuery, useDeleteOrderByIdMutation, useUpdateOrderStatusMutation, useMarkOrderAsViewedMutation} = orderAPI;