import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { AllProductsResponse, ProductResponse } from "../../../types/api-types";

export const  productAPI = createApi({ 
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/products/`,
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
    tagTypes: ['Products'], // Add a tag for products
    endpoints:(builder)=>({ 

        latest:builder.query<AllProductsResponse, string>({ 
            query: ()=>"latest", 
        }),

        allProducts:builder.query<AllProductsResponse, string>({ 
            query: ()=>"", 
            providesTags: ['Products'], // Tag for products query
        }),

        productDetails:builder.query<ProductResponse, string>({ 
            query: (id:string)=>id,
        }),

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createProduct:builder.mutation<any, FormData>({ 
            query: (formData)=>({ 
                url:"new",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ['Products'], // Invalidate the products cache
        }),
        
        updateProduct:builder.mutation({ 
            query:({productId, formData})=>{ 
                
                return{ 
                    url:`${productId}`,
                    method:'PUT',
                    body: formData,
                }
            },
            invalidatesTags: ['Products'], // Invalidate the products cache
        }),

        deleteProduct:builder.mutation({ 
            query: ({productId})=>{ 
                console.log('productId to Delete===>',productId);
                return{ 
                    url:`${productId}`,
                    method:"DELETE"
                }
            },
            invalidatesTags: ['Products'], // Invalidate the products cache
        }),

    }), 

})

export const {
    useLatestQuery,
    useAllProductsQuery,
    useProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productAPI;