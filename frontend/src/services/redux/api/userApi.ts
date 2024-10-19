import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { UserProfileResponse, UsersResponse,} from "../../../types/api-types";
export const  userAPI = createApi({ 
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/users/`,
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
    tagTypes: ['Users'], // Add a tag for users
    endpoints:(builder)=>({         

        fetchUsers:builder.query<UsersResponse, void>({ 
            query: ()=>"", 
            providesTags: ['Users'], // Tag for users query
        }),

        fetchUserById:builder.query<UserProfileResponse, string>({ 
            query: (id:string)=>(id),
            providesTags: ['Users'], // Tag for users query
        }),

    }), 
})

export const {useFetchUsersQuery, useFetchUserByIdQuery} = userAPI;