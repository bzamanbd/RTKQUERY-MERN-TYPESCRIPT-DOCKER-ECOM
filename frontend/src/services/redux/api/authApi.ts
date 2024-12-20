import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { MessageResponse } from "../../../types/api-types";
import { User } from "../../../vite-env";

export const  authAPI = createApi({ 
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/auth/`,
        prepareHeaders: (headers, {getState})=>{
            const state = getState() as RootState; 
            const token = state.userReducer.token; 
            if(token){headers.set('Authorization', token)};
            headers.set('Origin','http://localhost:5173');
            return headers;
        }
    }),
    endpoints:(builder)=>({ 
        register: builder.mutation<MessageResponse, User>({ 
            query:(user)=>({ 
                url: 'register',
                method: 'POST',
                body:user
            }),
            
        }),
        
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
              url: 'login',
              method: 'POST',
              body: user,
            }),    
          }),
    }), 

})

export const {useLoginMutation,useRegisterMutation} = authAPI