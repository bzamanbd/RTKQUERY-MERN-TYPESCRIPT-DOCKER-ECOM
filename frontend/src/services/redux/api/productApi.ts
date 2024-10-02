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
    endpoints:(builder)=>({ 

        latest:builder.query<AllProductsResponse, string>({ 
            query: ()=>"latest", 
        }),

        allProducts:builder.query<AllProductsResponse, string>({ 
            query: ()=>"", 
        }),

        ProductDetails:builder.query<ProductResponse, string>({ 
            query: (id)=>id, 
        }),

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createProduct:builder.mutation<any, FormData>({ 
            query: (formData)=>({ 
                url:"new",
                method: "POST",
                body: formData
            })
        }),

        updateProduct:builder.mutation({ 
            query: ({id, formData})=>({ 
                url:id,
                method:"PUT",
                body:formData
            }) 
        }),

        deleteProduct:builder.mutation({ 
            query: ({id})=>({ 
                url:id,
                method:"DELETE"
            }) 
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